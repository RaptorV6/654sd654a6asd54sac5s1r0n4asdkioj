import { useLocation } from "@builder.io/qwik-city";

export function useIsHrefActive(href: string, end: boolean = false) {
  const location = useLocation();
  const pathname = location.url.pathname;

  if (end && pathname === href) {
    return true;
  }

  if (pathname.startsWith(href)) {
    return true;
  }

  return false;
}

export function isHrefActive(pathname: string, href: string, end: boolean = false): boolean {
  if (end && pathname === href) {
    return true;
  }

  if (pathname.startsWith(href)) {
    return true;
  }

  return false;
}
