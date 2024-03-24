import { json } from '@sveltejs/kit'

// API URLs
const baseURL = "https://graph.cast.k3l.io/"
const followingRanking = "scores/global/following/fids"
const engagementRanking = "scores/global/engagement/fids"


// create an API to fetch frame data from URL
export async function GET(event) {
    let fid: Number = Number(event.url.searchParams.get("fid"));
    let type: String = event.url.searchParams.get("type") || "following";

    let defaultResponse = {
        "fid": 0,
        "rank": 0,
        "score": 0,
        "percentile": 0
    }
    let dataURL = "";

    if (type == "following") {
        dataURL = `${baseURL}${followingRanking}`;
    }
    else if (type == "engagement") {
        dataURL = `${baseURL}${engagementRanking}`;
    }

    if (dataURL !== "" && fid != 0) {
        let resp = await fetch(dataURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify([fid])
        });

        if(resp.status != 200) {
            return json(defaultResponse);
        }

        let data = await resp.json();
        if(data.result.length == 0) {
            return json(defaultResponse);
        }
        return json(data.result[0]);
    }

    return json(defaultResponse);
}
