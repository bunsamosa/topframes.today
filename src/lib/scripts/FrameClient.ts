// fetch frames
export async function fetchFrames(type: string, offset: number = 0, limit: number = 10, fid: Number = 0) {
    // fetch global or personal frame recommendations
    let dataURL = `/api/top-frames?limit=${limit}&offset=${offset}`;

    if (type == "personal") {
        dataURL = `/api/top-frames?limit=${limit}&offset=${offset}&fid=${fid}`;
    }
    let resp = await fetch(dataURL);
    let data = await resp.json();
    return data.result;
};


export async function fetchFrameData(url: string) {
    // make a get request to /api/frame-data?url=url
    let response = await fetch(`/api/frame-data?url=${url}`);
    let data = await response.json();

    console.log(data)
    return data;
}
