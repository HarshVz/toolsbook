import axios from "axios";

const fetchReddit = async(url) => {
    if (!url) {
        throw new Error('Invalid URL');
    }
        const response = await axios.get(`${url}.json`)
        if(response.status === 200){
            // console.log(response.data[0].data.children[0].data)
            console.log(response.data[0].data.children[0].data.title)
            console.log(response.data[0].data.children[0].data.selftext)
            console.log(response.data[0].data.children[0].data.subreddit)
            console.log(response.data[0].data.children[0].data.thumbnail)
            console.log('https://www.redditstatic.com/shreddit/assets/favicon/192x192.png')
            return{
                title: response.data[0].data.children[0].data.title,
                description: response.data[0].data.children[0].data.selftext || "None",
                subreddit: response.data[0].data.children[0].data.subreddit || "None",
                img: response.data[0].data.children[0].data.thumbnail || "None",
                icon: 'https://www.redditstatic.com/shreddit/assets/favicon/192x192.png',
                status: response.status
            }
        }
    }
// getData('https://www.troddit.com/r/FinalFantasy/comments/q15h2y/ff_ix_tshirt')

// fetchReddit(`https://www.reddit.com/r/opensource/comments/u0kqi7/alternative_web_client_for_reddit/`)
export {
    fetchReddit
}
