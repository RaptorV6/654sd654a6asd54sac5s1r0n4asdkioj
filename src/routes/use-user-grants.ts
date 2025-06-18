import { useAuthUser } from "./plugin@auth";

export function useUserGrants() {
  const user = useAuthUser();
  return user.grants;
}
