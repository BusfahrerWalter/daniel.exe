export interface AppNamespace {
	apiBase: string;
}

declare global {
	interface Window {
		app: AppNamespace;
	}
}

declare module globalThis {
	interface Window {
		app: AppNamespace;
	}
}