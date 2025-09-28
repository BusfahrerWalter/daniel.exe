<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content';
import { ref, onMounted } from 'vue';
import { getEducation, getPositions, getSkills } from '~/core/DataManager';
import type { EducationInfo, PositionInfo, SkillInfo } from '~/core/DataManager';

const headingClass = 'text-2xl font-bold mb-4 border-b border-gray-300 pb-2 dark:border-gray-700 flex items-center';

const about = ref<ContentCollectionItem | null>(null);
const skills = ref<SkillInfo[]>([]);
const positions = ref<PositionInfo[]>([]);
const education = ref<EducationInfo[]>([]);

onMounted(async () => {
	[about.value, skills.value, positions.value, education.value] = await Promise.all([
		queryCollection('content').path('/about-me').first(),
		getSkills(),
		getPositions(),
		getEducation()
	]);
});
</script>


<template>
	<div index="2">
		<section class="about-me mb-12">
			<h2 :class="headingClass">
				<UIcon name="tabler:user" class="text-3xl mr-2" />
				About Me
			</h2>
			<ContentRenderer v-if="about" :value="about.body" />
		</section>

		<section class="skills mb-12">
			<h2 :class="headingClass">
				<UIcon name="tabler:star" class="text-3xl mr-2" />
				Skills
			</h2>
			<div class="flex flex-wrap gap-2">
				<span v-for="skill in skills" :key="skill.name" class="inline-block bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
					{{ skill.name }}
				</span>
			</div>
		</section>

		<section class="positions mb-12">
			<h2 :class="headingClass">
				<UIcon name="tabler:briefcase" class="text-3xl mr-2" />
				Professional Experience
			</h2>
			<PositionCard v-for="value in positions" :value="value" />
		</section>

		<section class="education">
			<h2 :class="headingClass">
				<UIcon name="tabler:school" class="text-3xl mr-2" />
				Education
			</h2>
			<EducationCard v-for="value in education" :value="value" />
		</section>
	</div>
</template>