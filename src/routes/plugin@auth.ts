import type { JWT } from "@auth/core/jwt";
import type { Session, User } from "@auth/core/types";
// import type { AuthentikProfile as AuthentikProfileBase } from "@auth/qwik/providers/authentik";
import type { RequestEventCommon } from "@builder.io/qwik-city";

import { QwikAuth$ } from "@auth/qwik";
// import Authentik from "@auth/qwik/providers/authentik";
import Credentials from "@auth/qwik/providers/credentials";
import { globalAction$ } from "@builder.io/qwik-city";

import type { AuthUserRole } from "~/config/auth-user-roles";
import type { Permission } from "~/config/permissions";
import type { EmployeeSironaProfile } from "~/server/server-employee";

import { type Facility, tryFacility } from "~/config/facilities";
import { createIrisClient } from "~/iris";
import { authLdapUser } from "~/server/server-auth";
import {
  deserializeAuthUserProfileScopes,
  serializeAuthUserProfileGrants,
  serverEmployeeSironaProfile,
} from "~/server/server-employee";
import { envGet } from "~/utils/env-get";

export type AuthUserProfileGrant = {
  clinic?: string;
  department?: string;
  facility?: Facility;
  origin: string;
  permission: Permission;
  role?: AuthUserRole;
  segment?: string;
};

export type AuthUser = {
  defaultFacility: Facility;
  email: null | string;
  employeeId: string;
  grants: AuthUserProfileGrant[];
  id: string;
  image?: null | string;
  name: string;
};

export type AuthStrategy = "activedirectory" | "akesoauth" | "local";

declare module "@auth/core/types" {
  interface User extends Omit<AuthUser, "email" | "id" | "image" | "name"> {
    strategy: AuthStrategy;
  }

  interface Session {
    strategy: AuthStrategy;
    user: AuthUser;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    defaultFacility: string;
    employeeId: string;
    // Comma separated list of grants
    grants: string;
    profileId: string;
    strategy: AuthStrategy;
  }
}

// type AuthentikProfile = {
//   akord_userid?: number | string;
//   akord_username?: string;
//   // groups: ("doctor" | "sironaUser")[];
//   hospital_default?: string;
//   hospital_roles?: Record<string, string>;
//   hospitals?: string[];
// } & AuthentikProfileBase;

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(({ env }) => ({
  callbacks: {
    jwt(opts) {
      const token = opts.token;
      // const isUser = (v: unknown): v is User =>
      //   !!v && typeof v === "object" && "strategy" in v && typeof v.strategy !== "undefined";

      if (opts.trigger === "signIn") {
        // First time the callback is invoked, `user`, `profile` and `account` will be present.
        const { user } = opts;

        token.defaultFacility = user.defaultFacility;
        token.email = user.email;
        token.employeeId = user.employeeId;
        token.name = user.name;
        token.profileId = user.id ?? "profile-not-found";
        token.grants = serializeAuthUserProfileGrants(user.grants).join(",") || "";
        token.picture = user.image;
        token.strategy = user.strategy;
        token.exp = opts.token.exp;
        token.iat = opts.token.iat;
        token.jti = opts.token.jti;
        token.sub = opts.token.sub;
      } else if (opts.trigger === "signUp") {
        // A user is created for the first time in the database
      } else if (opts.trigger === "update") {
        // Triggered by the `useSession().update` method.
      }

      return token;
    },
    session(opts) {
      if ("token" in opts) {
        const token: JWT = opts.token;

        const user: AuthUser = {
          defaultFacility: tryFacility(token.defaultFacility),
          email: token.email ?? null,
          employeeId: token.employeeId,
          grants: deserializeAuthUserProfileScopes((token.grants || "").split(",").map((i) => i.trim())),
          id: token.profileId,
          image: token.picture,
          name: token.name ?? token.employeeId,
        };

        const session: Session = {
          ...opts.session,
          strategy: token.strategy,
          user,
        };

        return session;
      } else {
        throw new Error("AuthJs not supported `session` processing variant.");
      }
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    // Authentik<AuthentikProfile>({
    //   authorization: envGet(env, "AUTH_ADAPTER_AUTHENTIK_URL_AUTHORIZATION"),
    //   clientId: envGet(env, "AUTH_ADAPTER_AUTHENTIK_CLIENT_ID"),
    //   clientSecret: envGet(env, "AUTH_ADAPTER_AUTHENTIK_CLIENT_SECRET"),
    //   issuer: envGet(env, "AUTH_ADAPTER_AUTHENTIK_URL_ISSUER"),
    //   async profile(authentikProfile) {
    //     let employeeId: string;
    //     let employeeAkordId: number;

    //     try {
    //       ({ employeeAkordId, employeeId } = await serverEmployeeInfoByAkordIdOrUserName(
    //         env,
    //         authentikProfile.akord_userid,
    //         authentikProfile.akord_username,
    //       ));
    //     } catch (error) {
    //       if (error instanceof EmployeeIdentsUndefinedError) {
    //         throw new Error(
    //           `Akeso user profile for email '${authentikProfile.email}' has undefined AKORD ident fields.`,
    //         );
    //       }

    //       if (error instanceof EmployeeNotFoundError) {
    //         throw new Error(`Akeso user profile for email '${authentikProfile.email}' not found in AKORD.`);
    //       }

    //       throw error;
    //     }

    //     const sironaProfile = await serverEmployeeProfile(env, employeeId);

    //     return {
    //       email: authentikProfile.email,
    //       employeeAkordId,
    //       employeeId,
    //       id: employeeId,
    //       name: authentikProfile.name,
    //       profile: sironaProfile,
    //       strategy: "akesoauth",
    //     };
    //   },
    //   wellKnown: envGet(env, "AUTH_ADAPTER_AUTHENTIK_URL_WELLKNOWN"),
    // }),
    Credentials({
      async authorize(credentials) {
        const { password, strategy = "local", username } = credentials;

        if (username == null || typeof username !== "string" || password == null || typeof password !== "string") {
          return null;
        }

        const iris = createIrisClient(env);

        if (strategy === "ldap") {
          // Check incomming credentials against LDAP.
          let ldapUserAttributes: Awaited<ReturnType<typeof authLdapUser>> | null = null;
          try {
            ldapUserAttributes = await authLdapUser(env, username, password);
          } catch (error) {
            console.error("LDAP auth failed with error", error);
          }

          // If LDAP auth failed, return null.
          if (ldapUserAttributes == null) {
            return null;
          }

          let profile: EmployeeSironaProfile;
          try {
            profile = await serverEmployeeSironaProfile(iris, ldapUserAttributes.username);
          } catch (err) {
            console.error("Fetch of Employee Sirona User profile failed with error", err);
            return null;
          }

          const user: User = {
            defaultFacility: profile.defaultFacility,
            email: profile.email,
            employeeId: profile.employeeId,
            grants: profile.grants,
            id: profile.profileId,
            image: profile.image,
            name: profile.fullName,
            strategy: "activedirectory",
          };

          return user;
        } else {
          console.error("Local user account is not supported.");
        }

        return null;
      },
      credentials: {
        password: { required: true, type: "password" },
        strategy: { required: false, type: "hidden" },
        username: { required: true, type: "text" },
      },
    }),
  ],
  secret: envGet(env, "AUTH_SECRET"),
  session: {
    strategy: "jwt" as const,
  },
  trustHost: true,
}));

export function useAuthUser(): AuthUser;
export function useAuthUser(safe: true): AuthUser | null;
export function useAuthUser(safe?: boolean): unknown {
  const session = useSession();
  const user = session.value?.user;
  if (!user) {
    if (safe) {
      return null;
    }
    throw new Error("useAuthUser: User is not signed in!");
  }

  return user;
}

export function serverGetSession(requestEvent: RequestEventCommon): Session;
export function serverGetSession(requestEvent: RequestEventCommon, noRedirect: true): false | Session;
export function serverGetSession(requestEvent: RequestEventCommon, noRedirect?: true) {
  const session: null | Session = requestEvent.sharedMap.get("session");
  if (!session || new Date(session.expires) < new Date()) {
    if (noRedirect) {
      return false;
    } else {
      throw requestEvent.redirect(302, `/auth/login/?redirectTo=${requestEvent.url.pathname}`);
    }
  }
  return session;
}

export const useAuthEndsession = globalAction$(async (_, requestEvent) => {
  return {
    url: envGet(requestEvent.env, "AUTH_ADAPTER_AUTHENTIK_URL_ENDSESSION"),
  };
});
