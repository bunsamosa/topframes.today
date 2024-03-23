import { json } from '@sveltejs/kit'
import { parse } from 'node-html-parser';


// create an API to fetch frame data from URL
export async function GET(event) {
    let responseData = {
        "fetched": false,
    };

    let frameURL = event.url.searchParams.get("url");
    if (!frameURL) {
        return json(responseData);
    }

    // fetch frame data from URL
    const response = await fetch(frameURL);
    if (!response.ok) {
        return json(responseData);
    }

    const html = await response.text();

    // Parse the HTML content
    const root = parse(html);

    // Query the meta tags in the parsed document
    const metaTags = root.querySelectorAll('meta');

    // Iterate over the meta tags and extract the relevant information
    metaTags.forEach(tag => {
        const property = tag.getAttribute('property');
        const content = tag.getAttribute('content');

        // Filter and decode specific meta tags
        if (property && content) {
            if (property.startsWith('fc:') || property.startsWith('og:')) {
                responseData[property] = content;
            }
        }
    });

    responseData.fetched = true;
    return json(responseData);
}
