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

// Function to process the JSON object and extract the buttons
function extractButtons(jsonObject: { [key: string]: any }): any[] {
    const buttonRegex = /^fc:frame:button:(\d+)(?::(action|target|post_url))?$/;
    const buttons: { [key: string]: any } = {};

    for (const key in jsonObject) {
        const match = key.match(buttonRegex);
        if (match) {
            const idx = match[1];
            const property = match[2] || 'label';

            if (!buttons[idx]) {
                buttons[idx] = {};
            }

            buttons[idx][property] = jsonObject[key];
        }
    }

    return Object.values(buttons);
}

export async function fetchFrameData(url: string) {
    // make a get request to /api/frame-data?url=url
    let response = await fetch(`/api/frame-data?url=${url}`);
    let data = await response.json();

    // extract buttons from the JSON object
    data.buttons = extractButtons(data);
    console.log(data.buttons)
    return data;
}
