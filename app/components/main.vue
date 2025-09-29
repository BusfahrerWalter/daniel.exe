<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { TransitionProps } from 'vue'

const headerNav: NavigationMenuItem[] = [
	{ label: 'Home', to: '/' },
	{ label: 'Projects', to: '/projects' },
	{ label: 'Curriculum Vitae', to: '/cv' }
];

const items: NavigationMenuItem[] = [
	{ label: 'Website', to: 'https://adam-sandler.de', target: '_blank' },
	{ label: 'Source', to: 'https://github.com/BusfahrerWalter/daniel.exe', target: '_blank' },
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
</script>

<template>
	<UApp>
		<UHeader>
			<template #default>
				<UNavigationMenu :items="headerNav" variant="link" />
			</template>
		</UHeader>

		<UMain class="main px-6 py-6 md:px-12 md:py-16">
			<div class="main-inner max-w-screen-xl mx-auto">
				<NuxtLayout>
					<NuxtPage :transition="pageTransition" />
				</NuxtLayout>
			</div>
		</UMain>

		<USeparator icon="i-simple-icons-nuxtdotjs" type="dashed" class="h-px" />

		<UFooter>
			<template #left>
				<p class="text-muted text-sm">
					Copyright &copy; {{ new Date().getFullYear() }}
				</p>
			</template>

			<UNavigationMenu :items="items" variant="link" />

			<template #right>
				<UButton v-for="social in socials" :icon="social.icon" color="neutral" variant="ghost" :to="social.url"
					target="_blank" :aria-label="social.label" />
			</template>
		</UFooter>
	</UApp>
</template>

