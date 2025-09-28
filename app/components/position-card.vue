<script setup lang="ts">
import { defineProps } from 'vue';
import type { PositionInfo } from '~/core/DataManager';
import GenericCard from './generic-card.vue';

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