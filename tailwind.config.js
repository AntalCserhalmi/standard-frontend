/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "wallpaper": "url('../public/images/background.png')"
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"] 
            }
        },
    },
    plugins: []
};
