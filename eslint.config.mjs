// eslint.config.js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Disable specific ESLint rules globally
  {
    rules: {
      "react/no-unescaped-entities": "off", // Ignore unescaped characters in JSX
      "@typescript-eslint/no-explicit-any": "off", // Allow use of 'any' type
      // Add more rules to ignore as needed
    },
  },

  // Ignore default Next.js folders and generated files
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "node_modules/**",
    ],
  },
];

export default eslintConfig;
