<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import { random, sleep } from '~/core/Util'

export type FancyTextExpose = {
	$el: HTMLElement,
	displayText: any,
	setText: (text: string) => Promise<void>
}

type Props = {
	text?: string
	texts?: string[]
	initialDelay?: number;
	delay?: number          // glyph refresh cadence (ms-ish, but time-based)
	textDelay?: number      // pause between texts in the list (ms)
	chars?: string          // glyph set
	revealDuration?: number // total animation time per word (ms)
}

const props = withDefaults(defineProps<Props>(), {
	initialDelay: 0,
	delay: 50,
	textDelay: 2200,
	chars: '!<>-_\\/[]{}—=+*^?#$%&@ 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
	revealDuration: 900,
});

const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
const displayText = ref('');
let animationFrameId = 0;
let abortCycle = false;

onMounted(async () => {
	abortCycle = false;

	if (props.initialDelay > 0) {
		await sleep(props.initialDelay);
	}

	if (props.text) {
		await scrambleTo(props.text);
	} else if (props.texts?.length) {
		displayText.value = props.texts[0]!;
		await sleep(10);
		await cycleTexts(props.texts);
	}
});

onUnmounted(() => {
	abortCycle = true;
	cancelAnimationFrame(animationFrameId);
});

defineExpose({
	displayText,
	setText: scrambleTo
});

/**
 * Core scrambler: time-based, character slots with random start/end.
 * Smooth and deterministic per run; cancels cleanly on unmount.
 */
async function scrambleTo(target: string): Promise<void> {
	// be nice to motion-sensitive people ...
	if (reducedMotion.value) {
		displayText.value = target;
		return;
	}

	return new Promise((resolve) => {
		const now = performance.now();
		const from = displayText.value;
		const maxLen = Math.max(from.length, target.length);

		// Build slots: each char has [startTime, endTime], randomized for organic wave.
		const slots = Array.from({ length: maxLen }, (_, i) => {
			const fromChar = from[i] ?? '';
			const toChar = target[i] ?? '';
			const startOffset = Math.random() * (props.revealDuration * 0.6);
			const endOffset = startOffset + (props.revealDuration * 0.4) + (Math.random() * 120);

			return {
				from: fromChar,
				to: toChar,
				start: now + startOffset,
				end: now + endOffset,
				char: '', // current scrambled glyph
			};
		});

		const tick = (time: number) => {
			let completed = 0;
			let out = '';

			for (let i = 0; i < slots.length; i++) {
				const slot = slots[i]!;

				if (time >= slot.end) {
					completed++;
					out += slot.to;
				} else if (time >= slot.start) {
					// time to show a scrambling glyph; change it every ~props.delay ms worth of time
					if (!slot.char || ((time - slot.start) % (props.delay * 1.1) < 16)) {
						slot.char = props.chars[random(0, props.chars.length - 1)]!;
					}
					out += slot.char;
				} else {
					out += slot.from;
				}
			}

			displayText.value = out;

			if (completed === slots.length) {
				displayText.value = target; // ensure exact final
				resolve();
				return
			}

			animationFrameId = requestAnimationFrame(tick);
		};

		cancelAnimationFrame(animationFrameId);
		animationFrameId = requestAnimationFrame(tick);
	});
}

/**
 * Cycle through an array of texts forever (until unmount).
 */
async function cycleTexts(texts: string[]) {
	while (!abortCycle) {
		for (const text of texts) {
			if (abortCycle) {
				break;
			}

			await scrambleTo(text);

			// wait between words, but break early if unmounted
			const start = performance.now();
			while (!abortCycle && performance.now() - start < props.textDelay) {
				await sleep(50);
			}
		}
	}
}
</script>

<template>
	<span class="fancy-text">{{ displayText }}</span>
</template>

<style scoped>
.fancy-text {
	font-family: monospace, system-ui;
	font-variant-ligatures: none;
}
</style>