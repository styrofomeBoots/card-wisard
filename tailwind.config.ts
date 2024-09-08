/* eslint-disable @typescript-eslint/no-var-requires */
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,vue,js,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["night"],
    logs: false,
  },
} satisfies Config;
