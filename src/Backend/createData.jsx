import axios from "axios";
import { BACKEND_URL } from "../utils";
import { getDataFromWeb } from "../Scrape/index";
import { useRecoilState } from 'recoil';
import { collection } from '../store/ideas';

const createData = () => {
    const [collections, setCollections] = useRecoilState(collection);

    const createPost = async (data) => {

        console.log("Input: ", data)
            let response = await getDataFromWeb(data.url);
            response = response.data
            let new_data = {}

            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Add your authentication token if needed
                'Content-Type': 'application/json'  // Set appropriate content type
              };

            if(response){
                if(response.title && data.url && response.img && response.icon && data.category && data.keywords){
                    new_data = {
                        name: data.title || response.title,
                        url: data.url,
                        description: response.description || data.description,
                        image: response.img,
                        icon: response.icon,
                        category: data.category,
                        keywords: [...response.keywords, ...data.keywords],
                    }
                    const updatedCollections = [...collections, new_data];

                    const results = axios.post(`${BACKEND_URL}/createTools`,
                        {data: new_data}, { headers: headers }
                    )

                    setCollections(updatedCollections);
                    console.log("Response: ", updatedCollections);
                    localStorage.setItem('tools', JSON.stringify(updatedCollections));
                    return true;
                }else{
                    console.log("Invalid data provided")
                    return false;
                }

            }else{
                console.log("Invalid data provided")
                return false;
            }

    }


    const addManualPost = async (newData) => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Add your authentication token if needed
            'Content-Type': 'application/json'  // Set appropriate content type
          };
          if(newData.name && newData.url && newData.category && newData.keywords){
            const new_data = {
                name: newData.name || newData.url,
                url: newData.url,
                description: newData.description || '',
                img: "",
                icon: '',
                category: newData.category,
                keywords: newData.keywords,
              }
            const updatedCollections = [...collections, new_data];

            const results = axios.post(`${BACKEND_URL}/createTools`,
                {data: new_data}, { headers: headers }
            )
            setCollections(updatedCollections);
            localStorage.setItem('tools', JSON.stringify(updatedCollections));
            return true;
          }
    }

    const addCategory = async (data) => {
        if(!data){
            console.error('Invalid data provided');
            alert('Invalid data provided');
            return false;
        }
        try {
            console.log(data);
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Add your authentication token if needed
                'Content-Type': 'application/json'  // Set appropriate content type
              };
              const results = await axios.post(`${BACKEND_URL}/createCategory`,
                {data: data}, { headers: headers }
              )
              if(results.status == 200){
                return true
              }
        } catch (error) {
            console.error('Error adding category:', error);
            alert('Error adding category:', error)
            return false;
        }
    }

    return {createPost, addManualPost, addCategory};
}

export default createData;
