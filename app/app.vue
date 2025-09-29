<script setup lang="ts">
import { getUrlParam } from './core/Util';

const bootDone = ref(getUrlParam('skipBoot') !== null);

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
