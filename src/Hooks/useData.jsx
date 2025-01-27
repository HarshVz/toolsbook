import { useRecoilState } from 'recoil';
import { collection } from '../store/ideas';
import { apiUrl } from '../utils';
import axios from 'axios';
import {getDataFromWeb} from '../Scrape/index'

export const useData = () => {
    const [collections, setCollections] = useRecoilState(collection);

    const addManualData = async (newData) => {
        console.log(newData);
        const updatedCollections = [...collections,
            {
                name: newData.name || newData.url,
                url: newData.url,
                description: newData.description || '',
                img: 'https://images.pexels.com/photos/695644/pexels-photo-695644.jpeg?cs=srgb&dl=pexels-byrahul-695644.jpg&fm=jpg',
                icon: newData.icon || '',
                category: newData.category,
                keywords: newData.tag,
            }];
        setCollections(updatedCollections);
        // const response = await insertion("app", newData.name, newData)
        console.log("Response: ", response);
        localStorage.setItem('tools', JSON.stringify(updatedCollections));
        return true;

    }

    const addData = async (data) => {
        console.log("Input: ", data)
        let response = await getDataFromWeb(data.url);
        console.log("Response: ", response);
        response = response.data
        let new_data = {}

        if(response){
            if(response.title && data.url && response.img && response.icon && data.category && data.keywords){
                new_data = {
                    name: response.title,
                    url: data.url,
                    description: response.description || data.description,
                    image: response.img,
                    icon: response.icon,
                    category: data.category,
                    keywords: [...response.keywords, ...data.keywords],
                }
                console.log("New data: ", new_data)
                const updatedCollections = [...collections, new_data];

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
    };

    const deleteData = (name) => {
        const updatedCollections = collections.filter(tool => tool.name !== name);
        setCollections(updatedCollections);
        localStorage.setItem('tools', JSON.stringify(updatedCollections));
        return true;
    };

    const updateData = (name, updatedData) => {
        const updatedCollections = collections.map(tool =>
            tool.name === name ? { ...tool, ...updatedData } : tool
        );
        setCollections(updatedCollections);
        localStorage.setItem('tools', JSON.stringify(updatedCollections));
        return true;
    };

    const getData = async () => {
        // const tools = await getTools();
        return JSON.parse(localStorage.getItem('tools')) || [];
    };

    const getCategories = async () => {
        const categories = [
            {
                name: 'frontend',
                description: 'this is frontend'
            },
            {
                name: 'backend',
                description: 'this is backend'
            },
            {
                name: 'design',
                description: 'this is design'
            },
            {
                name: 'tools',
                description: 'this is tools'
            },
        ]
        return categories;
    }

    return { addData, deleteData, updateData, getData, addManualData, getCategories };
};
