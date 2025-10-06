<script setup lang="ts">
import { Vector } from '~/core/Vector';
import { random } from '~/core/Util';
import { useMediaQuery } from '@vueuse/core';

type WallIndex = 0 | 1 | 2 | 3;
const t = 0; // top
const r = 1; // right
const b = 2; // bottom
const l = 3; // left

const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
const props = defineProps({
	count: {
		type: Number,
		default: 3
	},
	size: {
		type: Number,
		default: 360
	}
});

const blobParent = ref();
const blobs: HTMLElement[] = [];

onMounted(() => {
	createBlobs(blobParent.value);
});

// function debug() {
// 	const canvas = document.createElement('canvas');
// 	const ctx = canvas.getContext('2d')!;

// 	const w = window.innerWidth;
// 	const h = window.innerHeight;
// 	const w2 = w / 2;
// 	const h2 = h / 2;

// 	canvas.style.position = 'fixed';
// 	canvas.style.inset = '0';
// 	canvas.width = w;
// 	canvas.height = h;

// 	document.body.append(canvas);

// 	let from = new Vector(w2, h2);

// 	window.addEventListener('click', (evt) => {
// 		from = new Vector(evt.clientX, evt.clientY);
// 	});

// 	window.addEventListener('mousemove', (evt) => {
// 		ctx.clearRect(0, 0, w, h);

// 		ctx.beginPath();
// 		ctx.moveTo(from.x, from.y);
// 		ctx.lineTo(evt.clientX, evt.clientY);
// 		ctx.strokeStyle = 'red';
// 		ctx.lineWidth = 2;
// 		ctx.stroke();


// 		const to = new Vector(evt.clientX, evt.clientY);

// 		const dir = to.sub(from);
// 		const nextWall = getNextWall(from, dir);
// 		const wallVec = getWallVector(nextWall);
// 		const wallPos = getWallPos(nextWall);
// 		const nextDir = Vector.reflect(dir, wallVec);
// 		const hitPos = Vector.intersection(to, dir, wallPos, wallVec)!;

// 		ctx.beginPath();
// 		ctx.moveTo(hitPos.x, hitPos.y);

// 		const offsetPos = hitPos.add(nextDir.invert.mul(10));
// 		ctx.lineTo(offsetPos.x, offsetPos.y);
// 		ctx.strokeStyle = 'green';
// 		ctx.stroke();

// 		ctx.beginPath();
// 		ctx.arc(hitPos.x, hitPos.y, 5, 0, Math.PI * 2);
// 		ctx.fillStyle = 'red';
// 		ctx.fill();

// 		const nextHitWall = getNextWall(hitPos, nextDir.invert);
// 		const nextHitWallVec = getWallVector(nextHitWall);
// 		const nextHitWallPos = getWallPos(nextHitWall);
// 		const nextHitPos = Vector.intersection(hitPos, nextDir.invert, nextHitWallPos, nextHitWallVec)!;

// 		ctx.beginPath();
// 		ctx.arc(nextHitPos.x, nextHitPos.y, 10, 0, Math.PI * 2);
// 		ctx.strokeStyle = 'yellow';
// 		ctx.lineWidth = 5;
// 		ctx.stroke();
// 	});
// }

function createBlobs(parent: HTMLElement) {
	for (let i = 0; i < props.count; i++) {
		const blob = document.createElement('span');

		blob.style.animationDelay = `${random(0, 3000)}ms`;
		blob.style.width = `${props.size}px`;

		animateBlob(blob, getRandomPos(), getRandomWallPos());

		blobs.push(blob);
		parent.append(blob);
	}
}

function animateBlob(blob: HTMLElement, from: Vector, to: Vector) {
	const distance = Vector.distance(from, to);
	const animation = blob.animate([{
		translate: `${from.x}px ${from.y}px`
	}, {
		translate: `${to.x}px ${to.y}px`
	}], {
		composite: 'replace',
		easing: 'linear',
		fill: 'forwards',
		direction: 'normal',
		iterations: 1,
		duration: distance * random(45, 55)
	});

	animation.addEventListener('finish', () => {
		const dir = to.sub(from);
		const nextWall = getNextWall(from, dir);
		const wallVec = getWallVector(nextWall);
		const wallPos = getWallPos(nextWall);
		const nextDir = Vector.reflect(dir, wallVec);
		const targetPos = Vector.intersection(to, nextDir.invert, wallPos, wallVec);

		animateBlob(blob, to, targetPos ?? getRandomWallPos());
	});
}

function getRandomPos(): Vector {
	return Vector.random(0, window.innerWidth - props.size, 0, window.innerHeight - props.size);
}

function getRandomWall(): WallIndex {
	return random(0, 3) as WallIndex;
}

function getRandomWallPos(wall?: WallIndex): Vector {
	wall = wall ?? getRandomWall();
	const width = window.innerWidth - props.size;
	const height = window.innerHeight - props.size;

	switch (wall) {
		case t: return Vector.random(0, width, 0, 0);
		case r: return Vector.random(width, width, 0, height);
		case b: return Vector.random(0, width, height, height);
		case l: return Vector.random(0, 0, 0, height);
	}
}

function getWallVector(wall: WallIndex): Vector {
	switch (wall) {
		case t: return Vector.right;
		case r: return Vector.up;
		case b: return Vector.left;
		case l: return Vector.down;
	}
}

function getWallPos(wall: WallIndex): Vector {
	const width = window.innerWidth - props.size;
	const height = window.innerHeight - props.size;

	switch (wall) {
		case t: return Vector.zero;
		case r: return new Vector(width, height);
		case b: return new Vector(width, height);
		case l: return Vector.zero;
	}
}

function getNextWall(pos: Vector, vel: Vector): WallIndex {
	const width = window.innerWidth - props.size;
	const height = window.innerHeight - props.size;
	const tx = vel.x > 0 ? (width - pos.x) / vel.x : vel.x < 0 ? -pos.x / vel.x : Infinity
	const ty = vel.y > 0 ? (height - pos.y) / vel.y : vel.y < 0 ? -pos.y / vel.y : Infinity

	// whichever time is smaller → that wall will be hit first
	if (tx < ty) {
		return vel.x > 0 ? r : l;
	} else {
		return vel.y > 0 ? b : t;
	}
}
</script>

<template>
	<div class="goo-wrap">
		<svg class="goo-svg">
			<defs>
				<filter id="goo">
					<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
					<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0
					0 1 0 0 0
					0 0 1 0 0
					0 0 0 18 -7" result="goo"></feColorMatrix>
					<feBlend in="SourceGraphic" in2="goo"></feBlend>
				</filter>
			</defs>
		</svg>

		<div
			:style="{ display: reduceMotion ? 'none' : 'block' }"
			ref="blobParent"
			class="blobs"
			aria-hidden="true">
		</div>
	</div>
</template>

<style>
.goo-wrap {
	position: fixed;
	inset: 0;
	display: block;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	opacity: .2;
}

.goo-svg, .blobs {
	position: absolute;
	inset: 0;
}

.blobs {
	filter: url(#goo);
}

.blobs span {
	position: absolute;
	aspect-ratio: 1;
	border-radius: 50%;
	background: radial-gradient(circle at 30% 30%, #53ffe2, #5b6cff 60%, transparent 70%);
	animation: drift-scale 22s infinite linear;
	opacity: .8;
	mix-blend-mode: screen;
}

@keyframes drift-scale {
	0% {
		transform: scale(1);
	}
	25% {
		transform: scale(1.1);
	}
	50% {
		transform: scale(0.9);
	}
	75% {
		transform: scale(1.08);
	}
	100% {
		transform: scale(1);
	}
}

@media (prefers-reduced-motion: reduce) {
	.blobs span {
		animation: none;
	}
}
</style>