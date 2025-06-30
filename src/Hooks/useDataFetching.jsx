import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import getData from '../Backend/getData'
import { collection, categories, selectedCategory, loading } from '../store/ideas'

/**
 * Shared hook for data fetching logic used by both Home and Gallery components
 * Implements smart caching strategy with timestamp-based cache invalidation
 */
export const useDataFetching = () => {
    const [collections, setCollections] = useRecoilState(collection)
    const [categoryList, setCategoryList] = useRecoilState(categories)
    const [selectCategory, setSelectCategory] = useRecoilState(selectedCategory)
    const [isLoading, setIsLoading] = useRecoilState(loading)

    const { getTools, getCategories } = getData()

    const fetchData = useCallback(async (options = {}) => {
        const {
            forceFresh = false,
            cacheTimeout = 5 * 60 * 1000 // 5 minutes default
        } = options

        try {
            setIsLoading(true)

            // Check cache validity unless forcing fresh data
            if (!forceFresh) {
                const cachedTimestamp = localStorage.getItem('dataTimestamp')
                const cacheAge = cachedTimestamp ? Date.now() - parseInt(cachedTimestamp) : Infinity

                // Use cache if it's fresh
                if (cacheAge < cacheTimeout) {
                    const cachedTools = localStorage.getItem("tools")
                    const cachedCategories = localStorage.getItem("categories")

                    if (cachedTools && cachedCategories) {
                        try {
                            const tools = JSON.parse(cachedTools)
                            const categories = JSON.parse(cachedCategories)

                            // Validate parsed data
                            if (Array.isArray(tools) && Array.isArray(categories)) {
                                setCollections(tools)
                                setCategoryList(categories)

                                // Set default category if none selected
                                if (!selectCategory && categories.length > 0) {
                                    setSelectCategory("all")
                                }

                                console.log('✅ Loaded from cache:', { tools: tools.length, categories: categories.length })
                                return { success: true, source: 'cache', data: { tools, categories } }
                            }
                        } catch (parseError) {
                            console.warn('⚠️ Cache parse error, fetching fresh data:', parseError)
                            // Continue to fetch fresh data
                        }
                    }
                }
            }

            // Fetch fresh data
            console.log('🔄 Fetching fresh data...')
            const [tools, categories] = await Promise.all([
                getTools(),
                getCategories()
            ])

            console.log('✅ Fetched fresh data:', { tools: tools.length, categories: categories.length })

            // Validate fetched data
            if (!Array.isArray(tools) || !Array.isArray(categories)) {
                throw new Error('Invalid data format received from API')
            }

            // Update state
            setCollections(tools)
            setCategoryList(categories)

            // Set default category if none selected
            if (!selectCategory && categories.length > 0) {
                setSelectCategory("all")
            }

            // Update cache with timestamp
            localStorage.setItem("tools", JSON.stringify(tools))
            localStorage.setItem("categories", JSON.stringify(categories))
            localStorage.setItem("dataTimestamp", Date.now().toString())

            return { success: true, source: 'api', data: { tools, categories } }

        } catch (error) {
            console.error('❌ Error fetching data:', error)

            // Fallback to any available cache (even if stale)
            const cachedTools = localStorage.getItem("tools")
            const cachedCategories = localStorage.getItem("categories")

            if (cachedTools && cachedCategories) {
                try {
                    const tools = JSON.parse(cachedTools)
                    const categories = JSON.parse(cachedCategories)

                    if (Array.isArray(tools) && Array.isArray(categories)) {
                        setCollections(tools)
                        setCategoryList(categories)

                        if (!selectCategory && categories.length > 0) {
                            setSelectCategory("all")
                        }

                        console.log('⚠️ Loaded stale cache after error:', { tools: tools.length, categories: categories.length })
                        return { success: true, source: 'stale-cache', data: { tools, categories }, error }
                    }
                } catch (parseError) {
                    console.error('❌ Cache parse error during fallback:', parseError)
                }
            }

            // No data available
            return { success: false, source: 'none', error }

        } finally {
            setIsLoading(false)
        }
    }, [getTools, getCategories, setCollections, setCategoryList, setSelectCategory, selectCategory, setIsLoading])

    const refreshData = useCallback(() => {
        return fetchData({ forceFresh: true })
    }, [fetchData])

    const clearCache = useCallback(() => {
        localStorage.removeItem("tools")
        localStorage.removeItem("categories")
        localStorage.removeItem("dataTimestamp")
        console.log('🗑️ Cache cleared')
    }, [])

    const getCacheInfo = useCallback(() => {
        const timestamp = localStorage.getItem('dataTimestamp')
        const hasTools = !!localStorage.getItem("tools")
        const hasCategories = !!localStorage.getItem("categories")

        return {
            hasCache: hasTools && hasCategories,
            timestamp: timestamp ? new Date(parseInt(timestamp)) : null,
            age: timestamp ? Date.now() - parseInt(timestamp) : null
        }
    }, [])

    return {
        fetchData,
        refreshData,
        clearCache,
        getCacheInfo,
        isLoading,
        collections,
        categoryList
    }
}
