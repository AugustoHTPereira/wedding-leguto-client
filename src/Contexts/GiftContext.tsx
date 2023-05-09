import { PropsWithChildren, createContext, useEffect, useState } from "react"
import { GiftType } from "../Contracts/Gifts"
import api from "../Services/API"

export interface GiftContextType {
    gifts: GiftType[],
    filters?: GiftContextFilter,
    isLoading: boolean,
    applyFilter: (filters?: GiftContextFilter) => void,
    categories: string[]
}

interface GiftContextFilter {
    categories: string[]
}

export const GiftContext = createContext<GiftContextType>({} as GiftContextType)

export const GiftContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [filters, setFilters] = useState<GiftContextFilter>();
    const [gifts, setGifts] = useState<GiftType[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Get gifts when initialize context
    useEffect(() => {
        const handleFetchGifts = () => {
            api.get("/gift")
                .then(({ data }) => setGifts(data))
                .finally(() => setIsLoading(false))
            ;
        }

        if (!gifts)
            handleFetchGifts();
    }, [])

    const handleApplyFilters = (f?: GiftContextFilter) => {
        setFilters(f);
    }

    return (
        <GiftContext.Provider
            value={{
                filters,
                gifts: !!filters && !!filters.categories.length && !!gifts?.length ? (gifts.filter(x => !!filters.categories.find(y => y == x.category))) : (gifts || []),
                isLoading,
                applyFilter: handleApplyFilters,
                categories: gifts?.map(x => x.category)?.filter((x, i, self) => self.indexOf(x) === i) || []
            }}
        >
            {children}
        </GiftContext.Provider>
    )
}