import next from "eslint-config-next";

// eslint-config-next 16 ships a native flat config (an array), so it is spread
// directly rather than wrapped in FlatCompat.
const eslintConfig = [
  ...next,
  {
    ignores: [".next/**", "node_modules/**", "public/**"],
  },
];

export default eslintConfig;
