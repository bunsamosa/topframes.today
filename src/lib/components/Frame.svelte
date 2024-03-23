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
        <a class="card card-hover overflow-hidden" href="/elements/cards">
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
                <!-- <Avatar src={getImageLink({ id: 'YOErFW8AfkI', w: 32, h: 32 })} width="w-8" /> -->
                <!-- <div class="flex-auto flex justify-between items-center">
                    <h6 class="font-bold" data-toc-ignore>By Alex</h6>
                    <small>On {new Date().toLocaleDateString()}</small>
                </div> -->
            </footer>
        </a>
    {/await}
</div>
