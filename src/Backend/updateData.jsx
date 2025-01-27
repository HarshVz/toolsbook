import axios from "axios";
import { BACKEND_URL } from "../utils";
import { getDataFromWeb } from "../Scrape/index";
import { useRecoilState } from 'recoil';
import { collection } from '../store/ideas';

const updateData = () => {
    const [collections, setCollections] = useRecoilState(collection);

    return {}
}

export default updateData;
