<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content';
import { getProfileInfo, type ProfileInfo } from '~/core/DataManager';

const markdown = ref<ContentCollectionItem | null>(null);
const data = ref<ProfileInfo | null>(null);

[markdown.value, data.value] = await Promise.all([
	queryCollection('content').path('/imprint').first(),
	getProfileInfo()
]);
</script>

<template>
	<div index="3">
		<div md-out>
			<ContentRenderer v-if="markdown && data" :value="markdown" :data="data" />
		</div>
	</div>
</template>