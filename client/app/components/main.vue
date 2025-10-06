<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { TransitionProps } from 'vue'
import { getProfileInfo } from '~/core/DataManager';

const headerItems: NavigationMenuItem[] = [
	{ label: 'Home', to: '/home' },
	{ label: 'Projects', to: '/projects' },
	{ label: 'Curriculum Vitae', to: '/cv' }
];

const srcUrl = 'https://github.com/BusfahrerWalter/daniel.exe';
const footerItems: NavigationMenuItem[] = [
	{ label: 'Website', to: 'https://adam-sandler.de', target: '_blank' },
	{ label: 'Source', to: srcUrl, target: '_blank' },
	{ label: 'Imprint', to: '/imprint', target: '_self' }
];

const socials = [
	{ label: 'GitHub', url: 'https://github.com/BusfahrerWalter', icon: 'i-simple-icons-github' },
	{ label: 'LinkedIn', url: 'https://linkedin.com/in/dm69', icon: 'i-simple-icons-linkedin' },
	{ label: 'X', url: 'https://x.com/BusfahrerWalter', icon: 'i-simple-icons-x' },
	{ label: 'CodePen', url: 'https://codepen.io/Busfahrer_Walter', icon: 'i-simple-icons-codepen' },
	{ label: 'HackTheBox', url: 'https://app.hackthebox.com/profile/145426', icon: 'i-simple-icons-hackthebox' },
	{ label: 'LeetCode', url: 'https://leetcode.com/u/BusfahrerWalter', icon: 'i-simple-icons-leetcode' },
	{ label: 'EntwicklerHeld', url: 'https://platform.entwicklerheld.de/publicprofile/c6854b8c5a3ca92c158d6b1cff199b8a', icon: 'i-simple-icons-lintcode' }
];

let currentIndex!: number;
let currentElement!: Element;

const clearClasses = (el: Element) => {
	el.classList.remove('page-scroll-in-r', 'page-scroll-in-l', 'page-scroll-out-r', 'page-scroll-out-l');
}

const pageTransition: TransitionProps = {
	name: 'scroll',
	mode: 'in-out',
	type: 'animation',
	enterActiveClass: 'page-animated',
	leaveActiveClass: 'page-animated',
	onBeforeEnter(el) {
		const index = parseInt(el.getAttribute('index')!);
		if (Number.isNaN(index)) {
			return;
		}

		const toRight = index > currentIndex;

		el.classList.add(`page-scroll-in-${toRight ? 'r' : 'l'}`);
		currentElement.classList.add(`page-scroll-out-${toRight ? 'l' : 'r'}`);
	},
	onBeforeLeave(el) {
		const index = parseInt(el.getAttribute('index')!);
		if (Number.isNaN(index)) {
			return;
		}

		currentIndex = index;
		currentElement = el;
	},
	onAfterEnter: clearClasses,
	onAfterLeave: clearClasses
};

const info = ref(await getProfileInfo());
</script>

<template>
	<UApp>
		<UHeader class="header">
			<template #title>
				<span class="text-muted">&lt;</span>
				<span>{{ info.firstName }} {{ info.lastName }}</span>
				<span class="text-muted">/&gt;</span>
			</template>

			<UNavigationMenu :items="headerItems" variant="link" />

			<template #right>
				<UColorModeButton />

				<UButton
					color="neutral"
					variant="ghost"
					:to="srcUrl"
					target="_blank"
					icon="i-simple-icons-github"
					aria-label="GitHub"
				/>
			</template>

			<template #body>
				<UNavigationMenu :items="headerItems" orientation="vertical" class="-mx-2.5" />
			</template>
		</UHeader>

		<UMain class="main px-6 py-6 md:px-12 md:py-16">
			<div class="main-inner max-w-screen-xl mx-auto">
				<NuxtLayout>
					<NuxtPage :transition="pageTransition" />
				</NuxtLayout>
			</div>
		</UMain>

		<effects-goo class="effect" />
		<div class="background"></div>

		<USeparator icon="tabler:code" type="dashed" class="icon-border h-px" />

		<UFooter class="footer backdrop-blur bg-default/75">
			<template #left>
				<p class="text-muted text-sm">
					Copyright &copy; {{ new Date().getFullYear() }}
				</p>
			</template>

			<UNavigationMenu :items="footerItems" variant="link" />

			<template #right>
				<UButton v-for="social in socials" :icon="social.icon" color="neutral" variant="ghost" :to="social.url"
					target="_blank" :aria-label="social.label" />
			</template>
		</UFooter>
	</UApp>
</template>

<style lang="scss">
.dark .background {
	position: fixed;
	inset: 0;
	background: radial-gradient(1200px 800px at 80% 20%, #2d2f55 0%, var(--ui-bg) 70%);
	background-position: 0 0;
}

.header {
	z-index: 100;
}

.footer {
	position: relative;
	z-index: 100;
}

.main {
	position: relative;
	z-index: 10;
	min-height: calc(100vh - var(--ui-header-height) - 81px);
	height: auto;

	&:has(.page-animated) {
		overflow: hidden;
	}
}

.effect {
	z-index: 1;
}

.background {
	z-index: 0;
}

.icon-border {
	position: relative;
	z-index: 110;
}
</style>

