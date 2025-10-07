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
		'~/assets/css/main.css',
		'~/assets/css/styles.scss',
		'~/assets/css/md.scss'
	],
	colorMode: {
		preference: 'system',
		fallback: 'light',
		storageKey: 'nuxt-color-mode'
	},
	app: {
		head: {
			meta: [{
				name: 'color-scheme',
				content: 'dark light'
			}]
		}
	},
	routeRules: {
		'/': {
			redirect: '/home'
		}
	},
	runtimeConfig: {
		public: {
			title: 'Daniel Müller',
			apiBase: process.env.NUXT_PUBLIC_API_BASE
		}
	}
})