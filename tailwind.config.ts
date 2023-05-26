import { type Config } from "tailwindcss";

export default {
  // content: [
  //   './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  //   './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  //   './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  // ],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  
  daisyui: {
    themes: [
      {
        neffrey: {
          primary: "#00DDC6",
          secondary: "#4E74BF",
          accent: "#7A5FD9",
          neutral: "#f0f0f0",
          "base-100": "#222222",
          info: "#9AD3F8",
          success: "#88F3D8",
          warning: "#FFDB58",
          error: "#F73B60",
        },
      },
    ],
  },
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
