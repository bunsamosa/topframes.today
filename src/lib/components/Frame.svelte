<script setup lang="ts">
    import { fetchFrameData } from '$lib/scripts/FrameClient';
	import Spinner from './common/Spinner.svelte';

    export let frameURL: string;
    let frameData: any;

    async function fetchData() {
        console.log('Fetching data for frame: ', frameURL);
        frameData = await fetchFrameData(frameURL);
    }
</script>

<div>
    {#await fetchData()}
        <Spinner />
    {:then}
        <div class="card card-hover overflow-hidden m-2">
            <header>
                <img src={frameData["og:image"]} class="bg-black/50 w-full aspect-[21/9]" alt="Post" />
            </header>
            <div class="p-4 space-y-4">
                <!-- <h6 class="h6" data-toc-ignore>{frameData["og:title"]}</h6> -->
                <h3 class="h3" data-toc-ignore>{frameData["og:title"]}</h3>
                <article>
                    <p>
                        {frameData["og:description"]}
                    </p>
                </article>
            </div>
            <hr class="opacity-50" />
            <footer class="p-4 flex justify-start items-center space-x-4">
                {#each frameData["buttons"] as btnData}
                    {#if (btnData.action == "mint" || btnData.action == "tx")}
                        <button class="btn variant-ghost-error rounded-full" disabled>{btnData.label}</button>
                    {:else}
                        <a href={btnData.post_url || frameData["fc:frame:post_url"]} target="_blank" rel="noopener noreferrer">
                            <button class="btn variant-ghost-primary rounded-full">{btnData.label}</button>
                        </a>
                    {/if}
                {/each}
            </footer>
        </div>
    {/await}
</div>
