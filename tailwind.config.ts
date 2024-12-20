import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arial: ["Arial"],
      },
      colors: {
        background: "#ffffff",
        black01: "#000",
        black02: "#112211",
        black03: "#1B1B1B",
        red01: "#FFE4E0",
        red02: "#FFC2BA",
        red03: "#FF472E",
        gray01: "#FAFAFA",
        gray02: "#EEEEEE",
        gray03: "#DDDDDD",
        gray04: "#CBC9CF",
        gray05: "#ADAEB8",
        gray06: "#A4A1AA",
        gray07: "#A1A1A1",
        gray08: "#79747E",
        gray09: "#4B4B4B",
        green01: "#CED8D5",
        green02: "#0B3B2D",
        green03: "#00AC07",
        orange01: "#FFF4E8",
        orange02: "#FF7C1D",
        yellow01: "#FFC23D",
        blue01: "#E5F3FF",
        blue02: "#2EB4FF",
        blue03: "#0085FF",
      },
      boxShadow: {
        custom: "0px 10px 30px 3px rgba(5, 16, 55, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
