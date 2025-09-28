<script setup lang="ts">
import Boot from './components/boot.vue';
import Main from './components/main.vue';
import { ref } from 'vue';
import { getUrlParam } from './core/Util';

const skipBoot = getUrlParam('skipBoot') !== null;
const bootDone = ref(skipBoot ?? false);

function onBootDone() {
	bootDone.value = true;
}
</script>

<template>
	<template v-if="bootDone">
		<Main />
	</template>
	<template v-else>
		<Boot @boot-done="onBootDone" />
	</template>
</template>
