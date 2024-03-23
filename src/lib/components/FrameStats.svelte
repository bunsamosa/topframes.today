<script setup lang="ts">
	import { fetchFrameCount } from '$lib/scripts/FrameClient';
	import Spinner from '$lib/components/common/Spinner.svelte';
</script>

<div class="mx-auto text-center py-16 px-6 w-full">
	<dl class="grid gap-8 mx-auto sm:grid-cols-3">
		<div class="flex flex-col items-center justify-center">
			{#await fetchFrameCount('hour')}
				<Spinner />
			{:then hourCount}
				<dt class="mb-2 text-4xl font-bold">{hourCount}</dt>
			{/await}
			<dd class="font-light text-gray-400">tweets in last hour</dd>
		</div>
		<div class="flex flex-col items-center justify-center">
			{#await fetchFrameCount('day')}
				<Spinner />
			{:then dayCount}
				<dt class="mb-2 text-4xl font-bold">{dayCount}</dt>
			{/await}
			<dd class="font-light text-gray-400">tweets in 24 hours</dd>
		</div>
		<div class="flex flex-col items-center justify-center">
			{#await fetchFrameCount('season')}
				<Spinner />
			{:then seasonCount}
				<dt class="mb-2 text-4xl font-bold">{seasonCount}</dt>
			{/await}
			<!-- <dt class="mb-2 text-4xl font-bold">30K+</dt> -->
			<dd class="font-light text-gray-400">tweets this season</dd>
		</div>
	</dl>
</div>
