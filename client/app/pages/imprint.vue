<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content';
import { getProfileInfo, type ProfileInfo } from '~/core/DataManager';

type ImprintInfo = ProfileInfo & {
	street: string,
	nr: string,
	city: string,
	zip: string,
	country: string
};

const markdown = ref<ContentCollectionItem | null>(null);
const data = ref<ImprintInfo | null>(null);

async function getImprintInfo(): Promise<ImprintInfo> {
	const profileInfo = await getProfileInfo();
	const imprintInfo = profileInfo as ImprintInfo;

	[imprintInfo.street, imprintInfo.nr, imprintInfo.zip, imprintInfo.city] =
		profileInfo.address.split(/\s/) as [string, string, string, string];

	imprintInfo.country = profileInfo.geoLocation.split(/\s/).at(-1)!;

	return imprintInfo;
}

[markdown.value, data.value] = await Promise.all([
	queryCollection('content').path('/imprint').first(),
	getImprintInfo()
]);
</script>

<template>
	<div index="3">
		<div md-out>
			<ContentRenderer v-if="markdown && data" :value="markdown" :data="data" />
		</div>
	</div>
</template>