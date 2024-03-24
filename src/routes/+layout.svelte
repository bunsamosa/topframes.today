<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';


	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Toasts
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { Toast } from '@skeletonlabs/skeleton';
	initializeStores();
</script>

<!-- App Shell -->
<Toast />
<AppShell class="max-w-7xl m-auto" regionPage="relative" slotPageHeader="lg:sticky lg:top-0 lg:z-10">
	<svelte:fragment slot="pageHeader">
		<!-- App Bar -->
		<AppBar background="" class="lg:fixed">
			<svelte:fragment slot="lead">
				<strong class="text-3xl">FrameCaster</strong>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
