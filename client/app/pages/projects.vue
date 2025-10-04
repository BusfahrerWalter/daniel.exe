<script setup lang="ts">
import { getProjects, type ProjectInfo } from '~/core/DataManager';

const projects = ref<ProjectInfo[]>([]);

[projects.value] = await Promise.all([
	getProjects()
]);
</script>

<template>
	<div index="1">
		<ProjectCard v-for="value in projects" :value="value" />
	</div>
</template>