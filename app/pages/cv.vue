<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getEducation, getPositions, type EducationInfo, type PositionInfo } from '~/core/DataManager';
import PositionCard from '~/components/position-card.vue';
import EducationCard from '~/components/education-card.vue';

const positions = ref<PositionInfo[]>([]);
const education = ref<EducationInfo[]>([]);

onMounted(async () => {
	positions.value = await getPositions();
	education.value = await getEducation();
});
</script>

<template>
	<div index="2">
		<section class="positions mb-12">
			<h2 class="text-2xl font-bold mb-4 border-b border-gray-300 pb-2 dark:border-gray-700">Professional Experience</h2>
			<PositionCard v-for="value in positions" :value="value" />
		</section>
		<section class="education">
			<h2 class="text-2xl font-bold mb-4 border-b border-gray-300 pb-2 dark:border-gray-700">Education</h2>
			<EducationCard v-for="value in education" :value="value" />
		</section>
	</div>
</template>