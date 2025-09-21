module.exports = {
  extends: [
    "next/core-web-vitals",
    "@next/eslint-config-next"
  ],
  ignorePatterns: [
    "src/generated/**/*",
    "node_modules/**/*",
    ".next/**/*"
  ],
  rules: {
    // Disabilita errori per file generati
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-require-imports": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-unused-expressions": "off"
  },
  overrides: [
    {
      // Ignora completamente i file generati da Prisma
      files: ["src/generated/**/*"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-this-alias": "off",
        "@typescript-eslint/no-unused-expressions": "off"
      }
    }
  ]
}