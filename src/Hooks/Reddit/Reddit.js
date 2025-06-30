import axios from "axios";

const fetchReddit = async(url) => {
    if (!url) {
        throw new Error('Invalid URL');
    }

    const response = await axios.post("https://redditproxy.harshweb.workers.dev/reddit", {
        slug: url
    })

    console.log(response.data)
    if(response.status === 200){
        return {
            title: response.data.title,
            description: response.data.description,
            subreddit:response.data.subreddit,
            img: response.data.srcImg,
            icon: 'https://www.redditstatic.com/shreddit/assets/favicon/192x192.png',
            status: response.status
        }
    }}
// getData('https://www.troddit.com/r/FinalFantasy/comments/q15h2y/ff_ix_tshirt')


return {
    fetchReddit
}
