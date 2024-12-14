<script setup lang="ts">
	import { onMount } from 'svelte';
	import { fetchFrames, fetchFrameData } from '$lib/scripts/FrameClient';
	import CardSkeleton from '$lib/components/common/CardSkeleton.svelte';
	import InfiniteScroll from '$lib/components/common/InfiniteScroll.svelte';
	import Frame from '$lib/components/Frame.svelte';
	import { userData } from '$lib/stores/User';
	export let listType = 'global';
	import VideoPlayer from 'svelte-video-player';


	// define reactive variables
	let frameList: Array<any> = [];
	let responseData: Array<any> = [];
	let offset = 0;
	let scrollElement: HTMLElement;
	let loading = true;

	// function to fetch data
	async function fetchData() {
		console.log('Fetching data for list type: ', listType, ' and offset: ', offset);
		responseData = await fetchFrames(listType, offset, 10, $userData.fid);
		console.log('Response length: ', responseData.length);
		loading = false;
	}

	// update frame list whenever new data is fetched
	$: frameList =[
		['https://photos.app.goo.gl/S5TCR49MYGux7Cxp9',],
		['https://storage.googleapis.com/bunsamosa/video1.mp4',],
		['https://storage.googleapis.com/bunsamosa/video2.mp4',],
		['https://storage.googleapis.com/bunsamosa/video3.mp4',],
		['https://storage.googleapis.com/bunsamosa/video4.mp4',],
	];

	// load first batch onMount
	onMount(() => {
		fetchData();
	});
</script>

<div>
	<ul class="h-screen overflow-y-scroll hide-scrollbar" bind:this={scrollElement}>
		{#if frameList.length === 0 && !loading}
			<div class="text-center font-semibold text-xl">
				There were no frames in the time frame
			</div>
		{:else if loading}
			{#each Array(10) as _, i}
				<li>
					<CardSkeleton />
				</li>
			{/each}
		{:else}
			{#each frameList as row}
				<li>
					<div class="card p-2">
						<VideoPlayer source={row} />
					</div>
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
