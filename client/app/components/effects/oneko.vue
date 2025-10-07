<script setup lang="ts">
import { neko, type NekoConfig } from 'onekojs';
import type { FancyTextExpose } from '../fancyText.vue';

const nekoElement = ref<HTMLElement>();
const nekoText = ref<FancyTextExpose>();
const isPet = ref(false);

const nekoPos = getInitialPosition();
const nekoConfig: NekoConfig = {
	...nekoPos,
	pause: 'idle'
};

onMounted(() => {
	const textEl = nekoText.value?.$el;
	if (!nekoElement.value || !textEl) {
		return;
	}

	nekoConfig.element = nekoElement.value;
	neko(nekoConfig);

	nekoElement.value.style.pointerEvents = 'all';
	nekoElement.value.style.cursor = 'pointer';

	textEl.style.left = `${nekoPos.x}px`;
	textEl.style.top = `${nekoPos.y}px`;
});

async function onClick() {
	nekoConfig.pause = false;
	nekoElement.value!.style.pointerEvents = 'none';
	nekoElement.value!.style.cursor = 'normal';

	if (nekoText.value) {
		await nekoText.value.setText('');
	}
	isPet.value = true;
}

function getInitialPosition() {
	const pos = {
		x: 0,
		y: 0
	};

	const isSmallScreen = window.innerWidth <= 600;
	if (isSmallScreen) {
		// top left
		pos.x = window.innerWidth / 2 - 100;
		pos.y = 200;
	} else {
		// bottom right
		pos.x = Math.min(window.innerWidth / 2 + 300, window.innerWidth - 100);
		pos.y = window.innerHeight - 320;
	}

	return pos;
}
</script>

<template>
	<div>
		<div ref="nekoElement" @click="onClick"></div>
		<FancyText
			v-if="!isPet"
			ref="nekoText"
			class="neko-text"
			text="Pet the cat!"
			:initial-delay="4000"
		/>
	</div>
</template>

<style scoped lang="scss">
.neko-text {
	position: fixed;
	z-index: 2147483647;
	translate: -50% -200%;
	pointer-events: none;
}
</style>