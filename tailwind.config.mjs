/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['media'],
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				jetbrainsPurple: "#883aea",
				jetbrainsGreen: "#AAFFAA",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}
