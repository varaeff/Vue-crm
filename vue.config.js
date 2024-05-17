import { defineConfig } from "@vue/cli-service";
import { DefinePlugin } from "webpack";

export default defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
      }),
    ],
  },
});
