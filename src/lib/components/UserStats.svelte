<script setup lang="ts">
	import { fetchRanking } from '$lib/scripts/UserClient';
	import Spinner from '$lib/components/common/Spinner.svelte';
	import { userData } from '$lib/stores/User';

</script>

<div class="mx-auto text-center py-16 px-6 w-full">
	<dl class="grid gap-8 mx-auto sm:grid-cols-2">
		<div class="flex flex-col items-center justify-center">
			{#await fetchRanking('following', $userData.fid)}
				<Spinner />
			{:then data}
				<dt class="mb-2 text-4xl font-bold">{data.rank}</dt>
			{/await}
			<dd class="font-light text-gray-400">ranking by followers</dd>
		</div>
		<div class="flex flex-col items-center justify-center">
			{#await fetchRanking('engagement', $userData.fid)}
				<Spinner />
			{:then data}
				<dt class="mb-2 text-4xl font-bold">{data.rank}</dt>
			{/await}
			<dd class="font-light text-gray-400">ranking by engagement</dd>
		</div>
		<!-- <div class="flex flex-col items-center justify-center">
			{#await fetchRanking('following', $userData.fid)}
				<Spinner />
			{:then data}
				<dt class="mb-2 text-4xl font-bold">{data.rank}</dt>
			{/await}
			<dt class="mb-2 text-4xl font-bold">30K+</dt>
			<dd class="font-light text-gray-400">tweets this season</dd>
		</div> -->
	</dl>
</div>
