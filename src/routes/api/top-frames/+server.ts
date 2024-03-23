import { json } from '@sveltejs/kit'


// create an API to fetch frame data from URL
export async function GET(event) {
    let limit: Number =  Number(event.url.searchParams.get("limit"));
    let offset: Number = Number(event.url.searchParams.get("offset"));
    let dataURL = `https://graph.cast.k3l.io/frames/global/rankings?agg=sumsquare&limit=${limit}&offset=${offset}`;

    let resp = await fetch(dataURL, {method: 'GET'});
    let data = await resp.json();
    return json(data);
}
