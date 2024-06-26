const { resolve } = require("node:path");

const project = resolve(__dirname, "tsconfig.json");

module.exports = {
  root: true,
  extends: [
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("@vercel/style-guide/eslint/next"),
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
  ],
  parserOptions: { project },
  settings: { "import/resolver": { typescript: { project } } },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "import/no-extraneous-dependencies": "off",
    "import/order": "off",
    "react/jsx-sort-props": "off",
  },
  overrides: [
    {
      files: [
        "src/app/**/page.tsx",
        "src/app/**/layout.tsx",
        "tailwind.config.ts",
        "next.config.mjs",
      ],
      rules: { "import/no-default-export": "off" },
    },
  ],
};
