import { json } from '@sveltejs/kit'


// create an API to fetch frame data from URL
export async function GET(event) {
    let limit: Number =  Number(event.url.searchParams.get("limit"));
    let offset: Number = Number(event.url.searchParams.get("offset"));
    let fid = event.url.searchParams.get("fid");
    let dataURL, resp;

    if (fid) {
        // fetch personalized ranking if FID is provided
        dataURL = `https://graph.cast.k3l.io/frames/personalized/rankings/fids?agg=sumsquare&weights=L1C5R3&voting=single&k=2&limit=${limit}`
        resp = await fetch(dataURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify([fid])
        });

    } else {
        // global frames ranking
        dataURL = `https://graph.cast.k3l.io/frames/global/rankings?agg=sumsquare&limit=${limit}&offset=${offset}&weights=L1C5R3`;
        resp = await fetch(dataURL, { method: 'GET' });
    }

    let data = await resp.json();
    return json(data);

}
