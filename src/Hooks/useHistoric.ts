import api from "../Services/API";

interface HistoricBaseParams {
    aditionalData?: any,
}

interface HomeAccessParams extends HistoricBaseParams { }
interface GiftListAccessParams extends HistoricBaseParams { }

interface UseHistoricType {
    homeAccess: (params?: HomeAccessParams) => void,
    giftListAccess: (params?: GiftListAccessParams) => void,
}

const useHistoric = (): UseHistoricType => {
    const handleHomeAccess = async (params?: HomeAccessParams) => {
        let url = "/historic/home_access?message=Somebody have been access home page";

        if (!!params?.aditionalData)
            url += `&aditionalData=${JSON.stringify(params.aditionalData)}`;

        await api.get(url);
    }
    const handleGiftListAccess = async (params?: GiftListAccessParams) => {
        let url = "/historic/gift_list_access?message=Somebody have been access gift list";

        if (!!params?.aditionalData)
            url += `&aditionalData=${JSON.stringify(params.aditionalData)}`;

        await api.get(url);
    }

    return {
        homeAccess: handleHomeAccess,
        giftListAccess: handleGiftListAccess
    }
}

export default useHistoric;