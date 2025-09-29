<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { TerminalWriter } from '~/core/TerminalWriter';
import { random } from '~/core/Util';

const preRef = ref<HTMLElement | null>(null);
const cursorRef = ref<HTMLElement | null>(null);
const showSpinner = ref(false);

const emit = defineEmits<{
	(event: 'boot-done'): void
}>();

function bootDone() {
	emit('boot-done');
}

onUnmounted(() => {
	window.removeEventListener('keydown', bootDone);
	window.removeEventListener('mousedown', bootDone);
});

onMounted(() => {
	window.addEventListener('keydown', bootDone);
	window.addEventListener('mousedown', bootDone);

	if (preRef.value && cursorRef.value) {
		boot(preRef.value, cursorRef.value);
	}
});

async function boot(el: HTMLElement, cursorEl: HTMLElement) {
	const writer = new TerminalWriter(el, {
		username: 'daniel',
		distro: 'hml',
		cursor: cursorEl,
		writeDelay: 100
	});

	await writer.sleep(1000);

	await writer.exec('npm run dev', true, [
		'[Warning] Do not run this in production!',
		'[Info] Starting development server ...'
	]);
	await writer.sleep(1000);

	const delay = writer.opts.writeDelay;
	writer.opts.writeDelay = 50;
	await writer.exec('^C', false, 'Aborting server start ...');
	await writer.exec('^C');
	await writer.exec('^C');
	await writer.exec('^C');
	await writer.exec('^C');
	writer.opts.writeDelay = delay;
	await writer.sleep(700);

	await writer.exec('clera', false, 'clera: command not found');
	await writer.sleep(700);
	await writer.exec('clear');
	writer.clear();
	await writer.sleep(700);

	await writer.exec('npm start', true, '[Info] Starting production server ...');
	await writer.sleep(700);

	const messages = [
		'Hunting ducks',
		'Deploying decoys',
		'Scanning for quacks',
		'Loading mallard module',

		'Warming up cache',
		'Connection to database',
		'Starting worker pool',
		'Running health checks',
		'Starting HTTP server',
		'Listening on port 8080',

		'Brewing coffee',
		'Synchronizing clocks',
		'Feeding hamsters',
		'Calibrating flux capacitor',
		'Decoding memes'
	].sort(() => Math.random() - .5);

	for (let i = 0; i < messages.length; i++) {
		const progress = (i + 1) / messages.length;

		const barLength = 10;
		const filledLength = Math.round(progress * barLength);
		const bar = '■'.repeat(filledLength) + '□'.repeat(barLength - filledLength);

		writer.appendLine(`[${bar}] ${messages[i]}`);
		writer.render();
		await writer.sleep(random(200, 500));

		if (i != messages.length - 1) {
			writer.clearLine();
		}
	}

	writer.appendLine(`Server running on ${window.location.origin}`);
	await writer.exec('');

	showSpinner.value = true;
	await writer.sleep(1000);

	bootDone();
}
</script>

<template>
	<div class="skip-text text-muted">
		(press any key to skip)
	</div>

	<div class="wrap">
		<pre ref="preRef"></pre>
		<div class="cursor" ref="cursorRef"></div>
	</div>

	<div class="fixed loading-spinner" :style="{ display: showSpinner ? 'block' : 'none' }">
		<UIcon name="tabler:loader-2" class="text-3xl animate-spin" />
	</div>
</template>

<style>
.wrap {
	position: relative;
	padding: 10px;
}

.cursor {
	position: absolute;
	background: white;
	top: 10px;
	left: 10px;
	animation: blink 1s step-start infinite;
}

@keyframes blink {
	0%, 100% { opacity: 1; }
	50% { opacity: 0; }
}

code {
	font-family: monospace;
	background-color: #f4f4f4;
	padding: 2px 4px;
	border-radius: 4px;
}

.warning {
	color: #c4960d;
}

.info {
	color: #1491a7;
}

.skip-text {
	position: fixed;
	font-style: italic;
	top: 10px;
	right: 10px;
}

.loading-spinner {
	top: 50%;
	left: 50%;
	translate: -50% -50%;
}
</style>