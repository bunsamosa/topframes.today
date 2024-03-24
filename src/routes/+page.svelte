<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script setup lang="ts">
	import { goto } from '$app/navigation';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import FrameList from '$lib/components/FrameList.svelte';
	import UserStats from '$lib/components/UserStats.svelte';
	import Lazy from 'svelte-lazy';
	import Fa from 'svelte-fa';
	import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
	import { createAppClient, viemConnector } from '@farcaster/auth-client';
	import { userData } from '$lib/stores/User';
	import Spinner from '$lib/components/common/Spinner.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';

	let loading = false;
	const toastStore: ToastStore = getToastStore();
	let t: ToastSettings = {
		message: '',
		autohide: true
	};

	// create farcaster auth client
	const appClient = createAppClient({
		relay: 'https://relay.farcaster.xyz',
		ethereum: viemConnector(),
	});

	// authenticate user
	async function login() {
		const { data: { channelToken, url } } = await appClient.createChannel({
			siweUri: "https://framecaster.xyz/login",
			domain: "Framecaster.xyz"
		});

		// open QR code login in a new window
		console.log("Opening login window");
		t.message = 'Opening login window';
		toastStore.trigger(t);

		loading = true;
		window.open(url, '_blank');
		const {data} = await appClient.watchStatus({ channelToken: channelToken });

		if (data.state === 'completed') {
			userData.set({
				loggedIn: true,
				name: data.displayName || data.username || "user",
				fid: data.fid || 0,
			})
			t.message = 'Login successful';
			toastStore.trigger(t);
		} else {
			console.log("Login failed");
			userData.set({
				loggedIn: false,
				name: "",
				fid: 0,
			})
			t.message = 'Login failed';
			toastStore.trigger(t);
		}
	}

	function exit() {
		userData.set({
			loggedIn: false,
			name: "",
			fid: 0,
		})
		tabSet = 0;
		loading = false;
	}
	let tabSet: number = 0;
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
				<div class="mt-10 flex">
					{#if !$userData.loggedIn}
						{#if loading}
							<Spinner />
						{:else}
							<button
								type="button"
								class="btn btn-xl variant-ghost-secondary rounded-full"
								on:click={login}
							>
								<span class="px-1">Login</span>
								<Fa icon={faAngleRight} />
							</button>
						{/if}
					{:else}
					<div class="text-2xl font-bold">
						Welcome {$userData.name}!
						<button
								type="button"
								class="btn variant-ghost-error rounded-full"
								on:click={exit}
							>
								<span class="px-1">exit</span>
								<Fa icon={faAngleRight} />
							</button>
					</div>
					{/if}
				</div>
			</div>
			{#if $userData.loggedIn}
				<Lazy keep=true>
					<div class="lg:block hidden">
						<UserStats />
					</div>
				</Lazy>
			{/if}
		</div>
		<div class="w-2/5 flex flex-col justify-start h-screen overflow-hidden">
			<TabGroup regionList="sticky top-0 variant-glass-surface">
				<Tab bind:group={tabSet} name="tab1" value={0}>Global top frames</Tab>
				{#if $userData.loggedIn}
					<Tab bind:group={tabSet} name="tab2" value={1}>For you</Tab>
				{/if}
				<!-- Tab Panels --->
				<svelte:fragment slot="panel">
					<Lazy keep=true>
						{#if tabSet === 0}
							<FrameList listType="global" />
						{:else if tabSet === 1}
							<FrameList listType="personal" />
						{/if}
					</Lazy>
				</svelte:fragment>
			</TabGroup>
		</div>
	</div>
</div>
