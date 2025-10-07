import { useHead, useRoute } from '#imports'

export default defineNuxtPlugin(() => {
	const appConfig = useRuntimeConfig();
	const route = useRoute();

	const onRouteChange = () => {
		// Make a nice title from the route name or path
		const routeName = route.name?.toString() ?? route.path;
		const title = routeName
			.replace(/[-_/]/g, ' ')
			.replace(/\b\w/g, (c) => c.toUpperCase());

		useHead({
			title: title ? `${appConfig.public.title} - ${title}` : appConfig.public.title
		});
	};

	watch(() => route.fullPath, onRouteChange, {
		immediate: true
	});
});
