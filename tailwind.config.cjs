/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			keyframes:{
				zoom_in:{
					'0%': {transform: 'scale(0)', opacity: '0'},
					'100': {transform: 'scale(1)', opacity: '1'}
				}
			},
			animation: {
				zoom_in: 'zoom_in ease-in 1s',
			}
		},
	},
	plugins: [],
}
