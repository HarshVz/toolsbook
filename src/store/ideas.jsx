import { atom, selector } from 'recoil'

// Base atoms
const collection = atom({
    key: 'collection',
    default: []
})

const categories = atom({
    key: 'categories',
    default: []
})

const selectedCategory = atom({
    key: 'selectedCategory',
    default: "all" // Set default to "all" instead of empty string
})

const searchValue = atom({
    key: 'searchValue',
    default: ""
})

const loading = atom({
    key: 'loading',
    default: false
})

const error = atom({
    key: 'error',
    default: null // Use null instead of false for better error handling
})

const navLinks = atom({
    key: 'navLinks',
    default: []
})

// Optimized selectors
const filteredCollection = selector({
    key: 'filteredCollection',
    get: ({ get }) => {
        const search = get(searchValue).toLowerCase().trim()
        const tools = get(collection)

        // Early return if no tools
        if (!tools || tools.length === 0) {
            return []
        }

        // Return all tools if no search term
        if (!search) {
            return tools
        }

        // Filter by search term (search in name and category for better UX)
        return tools.filter(tool =>
            tool.name?.toLowerCase().includes(search) ||
            tool.category?.toLowerCase().includes(search)
        )
    }
})

const filterByCat = selector({
    key: 'filterByCat',
    get: ({ get }) => {
        const category = get(selectedCategory)
        const tools = get(filteredCollection)

        // Early return if no tools
        if (!tools || tools.length === 0) {
            return []
        }

        // Return all tools if "all" category selected
        if (!category || category.toLowerCase() === "all") {
            return tools
        }

        // Filter by category
        return tools.filter(tool =>
            tool.category?.toLowerCase() === category.toLowerCase()
        )
    }
})

// Additional useful selectors
const categoriesWithCount = selector({
    key: 'categoriesWithCount',
    get: ({ get }) => {
        const cats = get(categories)
        const tools = get(collection)

        if (!cats || !tools) return cats

        return cats.map(cat => ({
            ...cat,
            count: tools.filter(tool =>
                tool.category?.toLowerCase() === cat.name.toLowerCase()
            ).length
        }))
    }
})

const searchStats = selector({
    key: 'searchStats',
    get: ({ get }) => {
        const allTools = get(collection)
        const filteredTools = get(filteredCollection)
        const categoryFilteredTools = get(filterByCat)
        const selectedCat = get(selectedCategory)
        const searchTerm = get(searchValue)

        return {
            total: allTools.length,
            afterSearch: filteredTools.length,
            afterCategoryFilter: categoryFilteredTools.length,
            hasActiveSearch: searchTerm.trim().length > 0,
            hasActiveCategory: selectedCat && selectedCat !== "all"
        }
    }
})

export {
    // Base atoms
    collection,
    categories,
    selectedCategory,
    searchValue,
    loading,
    error,
    navLinks,

    // Selectors
    filteredCollection,
    filterByCat,
    categoriesWithCount,
    searchStats
}
