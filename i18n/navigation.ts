import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// next-intl-aware wrappers that strip/add the locale prefix correctly.
// MUST be used instead of next/navigation's usePathname/useRouter in any
// component that needs to switch locales or build locale-aware links.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
