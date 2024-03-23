<script setup lang="ts">
	import { onMount } from 'svelte';
	import { fetchFrames } from '$lib/scripts/FrameClient';
	import CardSkeleton from '$lib/components/common/CardSkeleton.svelte';
	import InfiniteScroll from '$lib/components/common/InfiniteScroll.svelte';
	import Frame from '$lib/components/Frame.svelte';
	export let listType = 'hour';

	// define reactive variables
	let frameData: Array<any> = [];
	let responseData: Array<any> = [];
	let offset = 0;
	let scrollElement: HTMLElement;

	// function to fetch data
	async function fetchData() {
		console.log('Fetching data for list type: ', listType, ' and offset: ', offset);
		responseData = await fetchFrames(listType, offset);
		console.log('Response length: ', responseData.length);
	}

	// update frame list whenever new data is fetched
	$: frameData = [...frameData, ...responseData];

	// load first batch onMount
	onMount(() => {
		fetchData();
	});
</script>

<div>
	<ul class="h-screen overflow-y-scroll hide-scrollbar" bind:this={scrollElement}>
		{#if frameData.length === 0}
			<div class="text-center font-semibold text-xl">
				There were no frames in the time frame
			</div>
		{:else}
			{#each frameData as row (row.frameURL)}
				<li id={row.frameURL}>
					<Frame frameURL={row.frameURL} />
				</li>
			{/each}
			<InfiniteScroll
				hasMore={responseData.length > 0}
				threshold={500}
				elementScroll={scrollElement}
				on:loadMore={() => {
					offset += responseData.length;
					fetchData();
				}}
			/>
		{/if}
	</ul>
</div>
