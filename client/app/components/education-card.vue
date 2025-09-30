<script setup lang="ts">
import type { EducationInfo } from '~/core/DataManager';

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