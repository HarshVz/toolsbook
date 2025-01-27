import {fetchTwitterWithFallback} from './Twitter/Twitter.js'
import {fetchScreenshot, getMetadata} from './Scrape/scrape.js'
import {fetchReddit} from './Reddit/Reddit.js'

function isYouTubeURL(url) {
    return url.includes('youtube.com') || url.includes('youtu.be');
}
function isTwitterURL(url) {
    return url.includes('twitter.com') || url.includes('x.com');
}
function isRedditURL(url) {
    return url.includes('reddit.com');
}

const getDataFromWeb = async (url) => {
    if (!url) {
        throw new Error('Invalid URL');
    }

    let new_data = {}; // Use 'let' to avoid global declaration

    console.log(`Fetching data for ${url}:`);

    try {
        if (isYouTubeURL(url)) {
            const screenshotResult = await fetchScreenshot(url);
            const metadataResult = await getMetadata(url);

            new_data.img = metadataResult.img;
            new_data.icon = metadataResult.icon;
            new_data.title = metadataResult.title.length > screenshotResult.title.length
                ? metadataResult.title
                : screenshotResult.title;
            new_data.description = metadataResult.description;
            new_data.keywords = metadataResult.keywords ?? ["Youtube",metadataResult.title, metadataResult.description];
            new_data.url = url;

        } else if (isTwitterURL(url)) {
            const metadataResult = await fetchTwitterWithFallback(url);
            const screenshotResult = await fetchScreenshot(url);

            new_data.img = metadataResult.img || screenshotResult.img;
            new_data.icon = metadataResult.icon;
            new_data.title = metadataResult.title ?? screenshotResult.title;
            new_data.description = metadataResult.description;
            new_data.keywords = metadataResult.keywords ?? ["Twitter", "X", metadataResult.author ? metadataResult.author : ""];
            new_data.url = url;

        } else if (isRedditURL(url)) {
            const metadataResult = await fetchReddit(url);

            new_data.img = metadataResult.img;
            new_data.icon = metadataResult.icon;
            new_data.title = metadataResult.title;
            new_data.description = metadataResult.description;
            new_data.keywords = metadataResult.keywords ?? ["Reddit", metadataResult.title, metadataResult.description];
            new_data.url = url;

        } else {
            const screenshotResult = await fetchScreenshot(url);
            const metadataResult = await getMetadata(url);

            new_data.img = screenshotResult.img ?? metadataResult.img;
            new_data.icon = metadataResult.icon;
            new_data.title = metadataResult.title.length > screenshotResult.title.length
                ? metadataResult.title
                : screenshotResult.title;
            new_data.description = metadataResult.description;
            new_data.keywords = metadataResult.keywords === "No meta keywords found" ? [] : [metadataResult.keywords] ?? [url ,metadataResult.title, metadataResult.description];
            new_data.url = url;
        }

        console.log(new_data);
        return { data: new_data };

    } catch (error) {
        console.error(`Error fetching data for ${url}: ${error.message}`);
        throw error; // Re-throw the error for higher-level handling
    }
};

// getData(`https://www.gitbook.com/`)

export {
    getDataFromWeb
}

// getMetadata(`https://www.youtube.com/watch?v=awj8LRtKZR0`)
