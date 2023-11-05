/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      backGround: '#EBF4FB',
      Red: "#FD5050",
      white: "#FFFFFF"
    },
    extend: {
      keyframes: {
        usersBar : {
          '0%':{left: "100%"},
          '100%':{left: "0"}
        },
        groupBar : {
          '0%':{right: '100%'},
          '100%':{right: '0'}
        }
      },
      animation: {
        "users": "usersBar 0.35s forwards linear",
        "group": "groupBar 0.35s forwards linear"
      },
      dropShadow: {
        glow: [
          "0 0px 10px rgba(253 ,80, 80, 0.35)",
          "0 0px 5px rgba(253 ,80, 80, 0.2)",
          "0 0px 5px rgba(253 ,80, 80, 0.1)",
        ]
      }
    },
  },
  plugins: [],
}

