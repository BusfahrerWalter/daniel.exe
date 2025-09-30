<script setup lang="ts">
import { duration } from '~/core/Util';

const props = defineProps<{
	title: string;
	subtitle?: string;
	dateStart?: string;
	dateEnd?: string;
	location?: string;
	description?: string;
}>();

const dateDuration = computed(() => {
	return duration(props.dateStart, props.dateEnd);
});
</script>

<template>
	<div class="rounded-lg border border-gray-200 bg-white dark:bg-gray-900 shadow-sm p-6 mb-4 flex flex-col gap-2">
		<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
			<div>
				<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ props.title }}</h3>
				<p v-if="props.subtitle" class="text-sm text-gray-600 dark:text-gray-300">{{ props.subtitle }}</p>
			</div>
			<div v-if="props.dateStart" class="text-xs text-gray-500 dark:text-gray-400 md:text-right">
				<span>{{ props.dateStart }}</span>
				<span v-if="props.dateEnd"> &ndash; {{ props.dateEnd }}</span>
				<span v-if="dateDuration" class="ml-2 text-[11px] text-gray-400 dark:text-gray-500">({{ dateDuration }})</span>
			</div>
		</div>
		<div v-if="props.location" class="text-xs text-gray-500 dark:text-gray-400 italic">
			{{ props.location }}
		</div>
		<div v-if="props.description" class="text-sm text-gray-700 dark:text-gray-200 mt-2">
			{{ props.description }}
		</div>
	</div>
</template>
