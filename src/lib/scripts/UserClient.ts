
export async function fetchRanking(type: string, fid: number) {
    let dataURL = `/api/user-ranking?fid=${fid}&type=${type}`;
    let resp = await fetch(dataURL);
    let data = await resp.json();
    return data;
}
