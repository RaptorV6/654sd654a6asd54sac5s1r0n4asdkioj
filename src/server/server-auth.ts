import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";

import ldap from "ldapjs";

import { envGet } from "~/utils/env-get";

export async function authLdapUser(env: EnvGetter, username: string, password: string) {
  const ldapUrl = envGet(env, "AUTH_ADAPTER_LDAP_URL");

  // You might want to pull this call out so we're not making a new LDAP client on every login attemp
  const ldapClient = ldap.createClient({
    url: ldapUrl,
  });

  // LDAP username with domain prefix. Example: `nex\honza`.
  let domainUsername: string;
  let principalUsername: string;
  let pureUsername: string;

  const domainPrefix = "nem";
  const domainSuffix = "nem.local";

  if (username.includes("\\")) {
    // Entered username with domain prefix.
    domainUsername = username;
    pureUsername = username.split("\\")[1];
    principalUsername = `${pureUsername}@${domainSuffix}`;
  } else if (username.includes("@")) {
    // Entered username in principal format.
    principalUsername = username;
    pureUsername = username.split("@")[0];
    domainUsername = `${domainPrefix}\\${pureUsername}`;
  } else {
    // Entered username without any correct prefix or suffix
    pureUsername = username;
    domainUsername = `${domainPrefix}\\${pureUsername}`;
    principalUsername = `${pureUsername}@${domainSuffix}`;
  }

  // Essentially promisify the LDAPJS client.bind function
  const ldapLoginOk = await new Promise<boolean>((resolve) => {
    ldapClient.bind(domainUsername, password, (error) => {
      if (error) {
        console.error(`Active Directory login of user '${domainUsername}' failed with error.`, error);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });

  if (!ldapLoginOk) return null;

  type LdapUserAttributes = {
    domainUsername: string;
    name: string;
    principalUsername: string;
    username: string;
  };

  const ldapUserAttributes = await new Promise<LdapUserAttributes | null>((resolve) => {
    ldapClient.search(
      "OU=Uzivatel,DC=nem,DC=local",
      {
        attributes: ["cn", "displayName", "name"],
        filter: `(&(objectClass=person)(objectClass=user)(userPrincipalName=${principalUsername}))`,
        scope: "sub",
      },
      (error, res) => {
        if (error) {
          console.error("Searching for user attributes failed with error", error);
          resolve(null);
        } else {
          let userAttributes: LdapUserAttributes = {
            domainUsername,
            name: "",
            principalUsername,
            username: pureUsername,
          };

          res.on("searchEntry", (entry) => {
            userAttributes = entry.pojo.attributes.reduce((ua, a) => {
              if (["cn", "displayName", "name"].includes(a.type)) {
                if (a.values[0]) {
                  ua.name = a.values[0];
                }
              }
              return ua;
            }, userAttributes);
          });
          res.on("error", (err) => {
            console.error("Resolving use AD attributes failed with error", err);
            resolve(null);
          });
          res.on("end", () => {
            resolve(userAttributes);
          });
        }
      },
    );
  });

  await new Promise((resolve) => {
    ldapClient.unbind((error) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (error) {
        console.error("LDAP client unbind operation error.");
      }
      resolve(undefined);
    });
  });

  return ldapUserAttributes ?? null;
}
