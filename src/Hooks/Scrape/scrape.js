import axios from "axios";
import { ENDPOINT, ENDPOINT2, SECRET } from '../../utils';

const getScreenshot = async (url) => {
    if (!url) {
        throw new Error('Invalid URL');
    }
    url = encodeURI(url);
    console.log(SECRET)
    const headers = {
        'x-secret-key': `${SECRET}`,
        'Content-Type': 'application/json'
    };
    const response = await axios.get(`${ENDPOINT}/screenshot?url=${url}`, { headers });
    if (response.data.status === 200) {
        return {
            img: response.data.screenshot,
            url: decodeURI(url),
            title: response.data.title,
            status: response.data.status
        };
    } else {
        throw new Error(`Failed to get screenshot: ${response.data.message || 'Unknown error'}`);
    }
};

const fetchScreenshot = async (url) => {
    let attempt = 0;
    const maxAttempts = 3;
    while (attempt < maxAttempts) {
        try {
            const result = await getScreenshot(url);
            console.log(`Screenshot for ${result.url}:`);
            console.log(`Title: ${result.title}`);
            console.log(`URL: ${result.url}`);
            console.log(`Screenshot: ${result.img}`);
            return result;  // Successfully fetched screenshot
        } catch (error) {
            attempt++;
            console.error(`Attempt ${attempt} failed: ${error.message}`);
            if (attempt >= maxAttempts) {
                console.error('Max attempts reached. Could not fetch screenshot.');
            }
        }
    }
}

const getMetadata = async (url) => {
    if (!url) {
        throw new Error('Invalid URL');
    }
    try {
        const response = await axios.post(`${ENDPOINT2}/scrape`, {
            urls: [url]
        });

        if (response.data.status === 200) {
            console.log(`Metadata for ${url}:`);
            console.log(`${JSON.stringify(response.data.output[url])}`);

            return {
                img: response.data.output[url].img || "None",
                icon: response.data.output[url].icon || "None",
                status: response.data.status,
                title: response.data.output[url].title || "None",
                description: response.data.output[url].description || `This is ${response.data.output[url].title}, for more information checkout - ${url}`,
                keywords: response.data.output[url].keywords || [response.data.output[url].title]
            };
        } else {
            throw new Error(`Failed to fetch metadata: ${response.data.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error(`Error fetching metadata: ${error.message}`);
        throw error; // Re-throwing to allow higher-level error handling
    }
};

export {
    getScreenshot,
    fetchScreenshot,
    getMetadata
}
