<script setup lang="ts">
import { defineProps } from 'vue';
import type { EducationInfo } from '~/core/DataManager';
import GenericCard from './generic-card.vue';

defineProps<{
	value: EducationInfo
}>();
</script>

<template>
	<GenericCard
		:title="value.degreeName"
		:subtitle="value.schoolName"
		:date-start="value.startDate"
		:date-end="value.endDate"
		:location="value.activities"
		:description="value.notes"
	/>
</template>