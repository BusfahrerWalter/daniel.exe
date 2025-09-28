import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	ssr: false,
	devtools: {
		enabled: true
	},
	modules: [
		'@nuxt/content',
		'@nuxt/eslint',
		'@nuxt/image',
		'@nuxt/ui'
	],
	css: [
		'~/assets/css/main.css'
	],
	routeRules: {
		'/': {
			redirect: '/home'
		}
	}
})