import {
  generateReactQueryComponents,
  generateSchemaTypes,
} from "@openapi-codegen/typescript";

import { defineConfig } from "@openapi-codegen/cli";

export default defineConfig({
  backend: {
    from: {
      source: "url",
      url: `${process.env.PROD_BACKEND_URL}/server/specs/oas`,
    },
    outputDir: "src/robot",
    to: async (context) => {
      const filenamePrefix = "backend";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
