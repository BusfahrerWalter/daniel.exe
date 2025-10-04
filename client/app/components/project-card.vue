
<script setup lang="ts">
import { computed } from 'vue';

interface ProjectSnapshot {
	title: string;
	description: string;
	finishedOn: string;
	startedOn: string;
	url: string;
}

const props = defineProps<{
	value: ProjectSnapshot
}>();

const hostName = computed(() => {
	try {
		if (!props.value?.url) return null;
		const u = new URL(props.value.url);
		return u.hostname.replace('www.', '');
	} catch (e) {
		return props.value?.url ?? null;
	}
});
</script>

<template>
	<div>
		<GenericCard
			:title="value.title"
			:date-start="value.startedOn"
			:date-end="value.finishedOn"
			:description="value.description"
		/>

		<div v-if="value.url" class="flex justify-end mt-2 mb-6">
			<a :href="value.url" target="_blank" rel="noopener noreferrer"
				 class="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
				<span>Open</span>
				<span class="text-xs text-gray-500 dark:text-gray-400">{{ hostName }}</span>
			</a>
		</div>
	</div>
</template>

