import { atom, selector } from 'recoil'

const collection = atom({
    key: 'collection',
    default: []
})

const categories = atom({
    key: 'categories',
    default: []
})

const selectedCategory = atom({
    key:'selectedCategory',
    default: ""
})

const searchValue = atom({
    key: 'searchValue',
    default: ""
});

const loading = atom({
    key: 'loading',
    default: false
})

const error = atom({
    key: 'error',
    default: false
})

const filteredCollection = selector({
    key: 'filteredCollection',
    get: ({ get }) => {
        const search = get(searchValue);
        const tools = get(collection);
        return tools.filter(tool => tool.name.toLowerCase().includes(search.toLowerCase()));
    }
})

const filterByCat = selector({
    key: 'filterByCat',
    get: ({ get }) => {
        const category = get(selectedCategory);
        const tools = get(filteredCollection);
        if(category.toLowerCase() === "all"){
            return tools;
        }
        const filtered = tools.filter(tool => tool.category === category)
        if (filtered) { return filtered } else { return tools }
    }
})

const navLinks = atom({
    key: 'navLinks',
    default: []
})

export {
    collection,
    searchValue,
    filteredCollection,
    navLinks,
    categories,
    selectedCategory,
    filterByCat,
    loading,
    error
}
