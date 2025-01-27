import axios from "axios";
import { BACKEND_URL } from "../utils";
import { getDataFromWeb } from "../Scrape/index";
import { useRecoilState } from 'recoil';
import { collection } from '../store/ideas';

const deleteData = () => {
    const [collections, setCollections] = useRecoilState(collection);

    const deleteTool = async (name, id) => {

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
        return true;
    };

    const deleteCategory = async (categoryName, id) => {
        if(!categoryName && !id){
            console.log("Please provide a category name. & id");
            alert("Please provide a category name & id");
        }
        console.log(categoryName, id)
        try {
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Add your authentication token if needed
                'Content-Type': 'application/json'  // Set appropriate content type
              };
              const response = await axios.delete(`${BACKEND_URL}/category/${categoryName}/${id}`, { headers: headers});
              if(response.status === 200){
                const updatedCollections = collections.filter(tool => tool.category!== categoryName);
                setCollections(updatedCollections);
                localStorage.setItem('tools', JSON.stringify(updatedCollections));
                return true;
              }
        } catch (error) {
            console.error(error);
            alert("Failed to delete category");
        }

}

    return {deleteTool, deleteCategory};
}

export default deleteData;
