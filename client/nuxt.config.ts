import 'dotenv/config';
import { defineNuxtConfig } from "nuxt/config";

const publicEnvVars = {
	apiBase: process.env.API_URL
};

console.log('Using public environment variables:', publicEnvVars);

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
	routeRules: {
		'/': {
			redirect: '/home'
		}
	},
	runtimeConfig: {
		public: publicEnvVars
	}
})