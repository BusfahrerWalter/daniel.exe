<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content';
import { getProfileInfo, type ProfileInfo } from '~/core/DataManager';

const data = ref<ContentCollectionItem | null>(null);
const info = ref<ProfileInfo | null>(null);

[data.value, info.value] = await Promise.all([
	queryCollection('content').path('/imprint').first(),
	getProfileInfo()
]);
</script>

<template>
	<div index="3">
		<div md-out>
			<ContentRenderer v-if="data && info" :value="data" :data="info" />
		</div>
	</div>
</template>