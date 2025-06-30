import axios from "axios";
import { BACKEND_URL } from "../utils";
import { getDataFromWeb } from "../Scrape/index";
import { useRecoilState } from 'recoil';
import {loading} from '../store/ideas'
import { collection } from '../store/ideas';

const deleteData = () => {
    const [collections, setCollections] = useRecoilState(collection);
    const [isLoading, setIsLoading] = useRecoilState(loading);

    const deleteTool = async (name, id) => {
        if(!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
        if(!name && !id){
            console.log("Please provide either name or id.");
            alert("Please provide either name or id");
            return false;
        }

        console.log(name, id)
        setIsLoading(true);
        try {
            if(!name && !id){
                console.log("Please provide either name or id.");
                alert("Please provide either name or id");
            }

            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Add your authentication token if needed
                'Content-Type': 'application/json'  // Set appropriate content type
              };

            const response = await axios.delete(`${BACKEND_URL}/tool/${id}`, { headers: headers});
            console.log(response);
            // const tools = await getTools();
            const updatedCollections = collections.filter(tool => tool.name !== name);
            setCollections(updatedCollections);
            localStorage.setItem('tools', JSON.stringify(updatedCollections));
            setIsLoading(false);
            return true;
        } catch (error) {
            console.error(error);
        }
    };

    const deleteCategory = async (categoryName, id) => {
        if(!window.confirm(`Are you sure you want to delete "${categoryName}" category?`)) return;
        if(!categoryName && !id){
            console.log("Please provide a category name. & id");
            alert("Please provide a category name & id");
        }
        console.log(categoryName, id)
        try {
            setIsLoading(true);
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Add your authentication token if needed
                'Content-Type': 'application/json'  // Set appropriate content type
              };
              const response = await axios.delete(`${BACKEND_URL}/category/${categoryName}/${id}`, { headers: headers});
              if(response.status === 200){
                const updatedCollections = collections.filter(tool => tool.category!== categoryName);
                setCollections(updatedCollections);
                localStorage.setItem('tools', JSON.stringify(updatedCollections));
                setIsLoading(false);
                return true;
              }
        } catch (error) {
            console.error(error);
            alert("Failed to delete category");
            setIsLoading(false);
        }

}

    return {deleteTool, deleteCategory};
}

export default deleteData;
