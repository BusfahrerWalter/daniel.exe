<script setup lang="ts">
import { clamp, lerp } from '~/core/Util'

const cardRef = ref<HTMLElement | null>(null);

const maxTilt = 6; // degrees
let animationFrameId = 0;
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

function getPointerPosition(evt: MouseEvent | TouchEvent) {
	if (evt instanceof TouchEvent) {
		const t = evt.touches[0];
		return {
			x: t?.clientX ?? 0,
			y: t?.clientY ?? 0
		};
	}

	return {
		x: evt.clientX,
		y: evt.clientY
	};
}

function handleMove(evt: MouseEvent | TouchEvent) {
	const el = cardRef.value;
	if (!el) {
		return;
	}

	const rect = el.getBoundingClientRect();
	const { x, y } = getPointerPosition(evt);

	const dx = x - (rect.left + rect.width / 2);
	const dy = y - (rect.top + rect.height / 2);

	const px = dx / (rect.width / 2);
	const py = dy / (rect.height / 2);

	// rotateY should point towards the mouse horizontally
	targetY = clamp(px, -1, 1) * maxTilt;
	// rotateX should point towards the mouse vertically (invert so mouse below tilts up)
	targetX = clamp(py, -1, 1) * maxTilt * -1;
}

function resetTarget() {
	targetX = 0;
	targetY = 0;
}

function animate() {
	currentX = lerp(currentX, targetX, 0.12);
	currentY = lerp(currentY, targetY, 0.12);

	if (cardRef.value) {
		cardRef.value.style.transform = `perspective(900px) rotateX(${currentX}deg) rotateY(${currentY}deg)`;
	}

	animationFrameId = requestAnimationFrame(animate);
}

onMounted(() => {
	window.addEventListener('mousemove', handleMove, { passive: true });
	window.addEventListener('touchmove', handleMove, { passive: true });
	window.addEventListener('mouseleave', resetTarget);
	window.addEventListener('touchend', resetTarget);

	animationFrameId = requestAnimationFrame(animate);
});

onUnmounted(() => {
	cancelAnimationFrame(animationFrameId);
	window.removeEventListener('mousemove', handleMove);
	window.removeEventListener('touchmove', handleMove);
	window.removeEventListener('mouseleave', resetTarget);
	window.removeEventListener('touchend', resetTarget);
});
</script>

<template>
	<div index="0" class="home flex items-center justify-center w-full px-6 py-12">
		<!-- target element: add ref for 3D rotation -->
		<div ref="cardRef" class="w-full max-w-4xl text-center rounded-lg"
			style="will-change: transform; transition: box-shadow .15s ease; transform-style: preserve-3d;">
			<h1 class="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-4
                bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
				<FancyText :initial-delay="300" text="Hi, i'm Daniel" />
			</h1>

			<div class="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300">
				<FancyText :initial-delay="300" :texts="[
					`Software Developer`,
					`Web & Game Engineer`,
					`TypeScript & C# enjoyer`,
					`Not a ExtJS lover`,
					`Certified googler`
				]" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.home {
	position: absolute;
	top: 50%;
	left: 50%;
	translate: -50% -50%;
}
</style>