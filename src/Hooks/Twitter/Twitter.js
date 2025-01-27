import axios from "axios";

const fetchTwitter2 = async(url) => {

    if (!url || !isValidTwitterUrl(url)) {
        throw new Error('Invalid URL');
    }

    try {
        const response = await axios.get(`https://publish.twitter.com/oembed?url=${encodeURI(url)}&partner=&hide_thread=false`);
        if (response.status === 200) {
            const data = response.data;
            // console.log(data.url);           // Outputs: 'https://twitter.com/Praha37v/status/1882578917137199191'
            // console.log(data.author_name);   // Outputs: 'Praha'
            // console.log(data.author_url);    // Outputs: 'https://twitter.com/Praha37v'
            // console.log(data.html);          // Outputs the HTML content
            // console.log(data.width);         // Outputs: 550
            // console.log(data.provider_name); // Outputs: 'Twitter'
            return {
                data: response.data,
                title: data.author_name,
                description: data.html,
                icon: "None",
                status: response.data.status
            };
        } else {
            throw new Error(`Failed to fetch Twitter card: ${response.data.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error(`Error fetching Twitter card: ${error.message}`);
        throw error; // Re-throwing to allow higher-level error handling
    }
}
const fetchTwitter = async (url) => {
    // Validate URL format and extract tweet ID
    if (!url || !isValidTwitterUrl(url)) {
        throw new Error('Invalid URL');
    }

    const postId = extractTwitterPostId(url);

    if (!postId) {
        throw new Error('Unable to extract tweet ID from URL');
    }

    try {
        // Replace with a valid Twitter API endpoint or trusted CDN (here's an example using Twitter API)
        const response = await axios.get(`https://cdn.syndication.twimg.com/tweet-result?id=${postId}&lang=en&token=3u9iqkwpbab&f5f7fk=2jy68w4q5oxg&x4lan5=3xx98ystj6mv&yr1moe=148kmnh81dkc&pt8gzq=10ib538f63pmo&id177x=v28eng9z60q&oeyjyp=n0gv8u63831&aqiui3=30kb8d9on17l&6a8u8o=976p18ie6cik&arj5ie=52zse8eogw84`);

        // Ensure the response is valid and contains expected data
        if (response && response.data) {
            // console.log(response.data);  // Log response data for debugging
            // console.log(normalizeText(response.data.text))
            // console.log(response.data.user.name)
            // console.log(response.data.user.profile_image_url_https)
            // console.log(response.data.photos[0].url || response.data.mediaDetails[0].media_url_https)

            return {
                title: `${response.data.user.name} - ${normalizeText(response.data.text)}`,
                author: response.data.user.name,
                icon: response.data.user.profile_image_url_https,
                img: response.data.photos[0].url || response.data.mediaDetails[0].media_url_https,
                 status: 200,
                description: normalizeText(response.data.text)
            };

        } else {
            throw new Error('Failed to fetch tweet data');
        }

    } catch (error) {
        console.error(`Error fetching Twitter post: ${error.message}`);
        throw error; // Re-throw the error for higher-level handling
    }
};
const fetchTwitterWithFallback = async (url) => {
    try {
        // Attempt to fetch using fetchTwitter
        return await fetchTwitter(url);
    } catch (error) {
        console.warn(`fetchTwitter failed: ${error.message}, trying fetchTwitter2...`);
        try {
            // Attempt to fetch using fetchTwitter2
            return await fetchTwitter2(url);
        } catch (fallbackError) {
            console.error(`fetchTwitter2 failed: ${fallbackError.message}`);
            throw new Error('Both fetchTwitter and fetchTwitter2 failed');
        }
    }
};

// fetchTwitterWithFallback('https://x.com/HarshVisuals/status/1584393986973700096')

//Twitter Helper Functions!
function normalizeText(text) {
    // Replace newlines with proper Markdown for line breaks
    let normalizedText = text.replace(/\n\n/g, '\n\n').replace(/\n/g, '  \n'); // Converts single newlines to Markdown line breaks

    // Replace mentions with Markdown style links (optional, depends on use case)
    normalizedText = normalizedText.replace(/@([a-zA-Z0-9_]+)/g, '(@$1)');

    // Process URLs to make them clickable in Markdown
    normalizedText = normalizedText.replace(/https?:\/\/[^\s]+/g, (url) => {
        return `[${url}](${url})`;
    });

    return normalizedText;
}
function extractTwitterPostId(url) {
    const regex = /https?:\/\/(?:www\.)?x\.com\/(?:\w+\/status\/)(\d+)(?:\?[^#]*)?/;
    const match = url.match(regex);

    if (match) {
        console.log("Match");
        return match[1];  // Return the post ID
    } else {
        console.log("No Match");
        return null;  // Return null if no match is found
    }
}

function isValidTwitterUrl(url) {
    const regex = /^https?:\/\/(?:www\.)?x\.com\/[a-zA-Z0-9_]+\/status\/\d+(?:\?[^#]*)?$/;
    return regex.test(url);
}

console.log(isValidTwitterUrl("https://x.com/Praha37v/status/1882578917137199191"));



// https://platform.twitter.com/embed/index.html?dnt=true&embedId=twitter-widget-0&frame=false&hideCard=false&hideThread=True&id=1584393986973700096&lang=en&theme=light&widgetsVersion=ed20a2b%3A1601588405575


export {
    fetchTwitterWithFallback,
    fetchTwitter,
    fetchTwitter2,
    normalizeText,
    extractTwitterPostId,
    isValidTwitterUrl,
};
