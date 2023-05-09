import { useContext } from "react"
import { GiftContext } from "../Contexts/GiftContext"

const useGifts = () => {
    const context = useContext(GiftContext);
    return context;
}

export default useGifts;