import { collection } from '../store/ideas'
import { useRecoilState, useRecoilValue } from 'recoil'

const [collections, setCollections] = useRecoilState(collection)
import {getDataFromWeb} from '../Scrape/index'

function addData(data) {
    setCollections([...collections, data]);
    localStorage.setItem('tools', JSON.stringify([...collections, data]));
    onSubmit(data);
    return true
}

const deleteData = (name) => {
    const deleted = collections.filter(tool => {
        return name !== tool.name
    })
    setCollections(deleted)
    localStorage.setItem('tools', JSON.stringify(deleted));
    return true
}

const updateData = () => {

}

const getData = () => {
    return JSON.parse(localStorage.getItem('tools')) || [];
}

export{
    addData,
    deleteData,
    updateData,
    getData
}
