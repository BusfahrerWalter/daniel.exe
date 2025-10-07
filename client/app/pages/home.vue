<template>
	<div index="0" class="home flex items-center justify-center w-full px-6 py-12">
		<div class="w-full max-w-4xl text-center">
			<h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4
				bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
				<FancyText text="Hi, i'm Daniel" />
			</h1>

			<div class="text-lg md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300">
				<FancyText :texts="[
					`Software Developer`,
					`Web & Game Engineer`,
					`TypeScript & C# enjoyer`,
					`Not a ExtJS lover`,
					`Certified googler`
				]" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.home {
	position: absolute;
	top: 50%;
	left: 50%;
	translate: -50% -50%;
}
</style>