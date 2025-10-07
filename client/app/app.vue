<script setup lang="ts">
import { init as initDataManager } from './core/DataManager';
import { getUrlParam } from './core/Util';

const bootDone = ref(getUrlParam('showBoot') === null);
const config = useRuntimeConfig();

window.app = {
	apiBase: config.public.apiBase as string
};

initDataManager();
</script>

<template>
	<template v-if="bootDone">
		<Main />
	</template>
	<template v-else>
		<Boot @boot-done="bootDone = true" />
	</template>
</template>
