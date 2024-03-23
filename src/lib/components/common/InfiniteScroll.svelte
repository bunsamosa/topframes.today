<script setup lang="ts">
	import { onDestroy, createEventDispatcher } from 'svelte';

	// define props
	export let threshold = 0;
	export let horizontal = false;
	export let elementScroll: HTMLElement;
	export let hasMore = true;

	// create event dispatcher
	const dispatch = createEventDispatcher();
	let isLoadMore = false;
	let component: HTMLElement;

	// add event listeners to the element
	$: {
		if (component || elementScroll) {
			const element = elementScroll ? elementScroll : component.parentNode;

			element?.addEventListener('scroll', onScroll);
			element?.addEventListener('resize', onScroll);
		}
	}

	// handle scroll event
	const onScroll = (e) => {
		const element = e.target;

		const offset = horizontal
			? e.target.scrollWidth - e.target.clientWidth - e.target.scrollLeft
			: e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop;

		// when the offset is less than the threshold, emit an event
		if (offset <= threshold) {
			if (!isLoadMore && hasMore) {
				dispatch('loadMore');
			}
			isLoadMore = true;
		} else {
			isLoadMore = false;
		}
	};

	// remove event listeners on destroy
	onDestroy(() => {
		if (component || elementScroll) {
			const element = elementScroll ? elementScroll : component.parentNode;

			element?.removeEventListener('scroll', null);
			element?.removeEventListener('resize', null);
		}
	});
</script>

<div bind:this={component} style="width:0px" />
