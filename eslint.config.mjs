import next from "eslint-config-next";

// `eslint-config-next` (16.x+) ships native flat-config arrays —
// no FlatCompat shim required. Spread and append our own overrides at the end.
const config = [
  ...next,
  {
    ignores: ["public/**", "node_modules/**", ".next/**", ".vercel/**"],
  },
];

export default config;
