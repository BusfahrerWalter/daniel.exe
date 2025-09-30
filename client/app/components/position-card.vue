<script setup lang="ts">
import type { PositionInfo } from '~/core/DataManager';

defineProps<{
	value: PositionInfo
}>();
</script>

<template>
	<GenericCard
		:title="value.title"
		:subtitle="value.companyName"
		:date-start="value.startedOn"
		:date-end="value.finishedOn"
		:location="value.location"
		:description="value.description"
	/>
</template>