<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script setup lang="ts">
	import { goto } from '$app/navigation';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import FrameList from '$lib/components/FrameList.svelte';
	import FrameStats from '$lib/components/FrameStats.svelte';
	import Lazy from 'svelte-lazy';
	import Fa from 'svelte-fa';
	import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

	let tabSet: number = 0;

	function leaderboard() {
	}
</script>


<!-- Content for large screen only -->
<div class="hidden lg:block">
	<div class="flex h-screen">
		<div class="w-3/5 h-full flex flex-col justify-center items-center">
			<div>
				<span class="text-7xl font-bold">
					discover
					<br /> top frames
					<br />on farcaster
				</span>
				<!-- <div class="mt-10 flex">
					<button
						type="button"
						class="btn btn-xl variant-ghost-secondary rounded-full"
						on:click={leaderboard}
					>
						<span class="px-1">leaderboard</span>
						<Fa icon={faAngleRight} />
					</button>
				</div> -->
			</div>
			<Lazy keep=true>
				<div class="lg:block hidden">
					<FrameStats />
				</div>
			</Lazy>
		</div>
		<div class="w-2/5 flex flex-col justify-start h-screen overflow-hidden">
			<TabGroup regionList="sticky top-0 variant-glass-surface">
				<Tab bind:group={tabSet} name="tab1" value={0}>Last Hour</Tab>
				<Tab bind:group={tabSet} name="tab2" value={1}>24 Hours</Tab>
				<Tab bind:group={tabSet} name="tab2" value={2}>7 days</Tab>
				<Tab bind:group={tabSet} name="tab3" value={3}>Season 5</Tab>
				<!-- Tab Panels --->
				<svelte:fragment slot="panel">
					<Lazy>
						{#if tabSet === 0}
							<FrameList listType="hour" />
						{:else if tabSet === 1}
							<FrameList listType="day" />
						{:else if tabSet === 2}
							<FrameList listType="week" />
						{:else if tabSet === 3}
							<FrameList listType="season" />
						{/if}
					</Lazy>
				</svelte:fragment>
			</TabGroup>
		</div>
	</div>
</div>
