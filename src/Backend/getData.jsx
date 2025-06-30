import axios from "axios";
import { BACKEND_URL } from "../utils";
import { getDataFromWeb } from "../Scrape/index";
import { useRecoilState } from 'recoil';
import { collection } from '../store/ideas';

const getData = () => {
    const [collections, setCollections] = useRecoilState(collection);

    const getTools = async () => {

        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Add your authentication token if needed
            'Content-Type': 'application/json'  // Set appropriate content type
          };
        const response = await axios.get(`${BACKEND_URL}/tools`, { headers: headers});
        // console.log(response);
        // const tools = await getTools();
        if(response.status === 200){
            return response.data.data
        }
        return JSON.parse(localStorage.getItem('tools')) || [];
    };

    const getCategories = async () => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Add your authentication token if needed
            'Content-Type': 'application/json'  // Set appropriate content type
          };
          const response = await axios.get(`${BACKEND_URL}/category`, { headers: headers});
        //   console.log("Categories" ,response.data)
          if(response.status === 200){
            return response.data.data
          }
    }

    const getToolsByCategory = async (category) => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Add your authentication token if needed
            'Content-Type': 'application/json'  // Set appropriate content type
          };
          if(!category){
            // console.log("Please provide a category");
            alert("Please provide a category");
          }
        const response = await axios.get(`${BACKEND_URL}/category/${category}`, { headers: headers});
        if(response.status === 200){
            return response.data.data
        }
        // const tools = await getToolsByCategory(category);
        // return tools;
    }

    return {getTools, getCategories, getToolsByCategory}
}

export default getData;
