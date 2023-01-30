import api from "../Services/API";

interface HistoricBaseParams {
    aditionalData?: any,
}

interface HomeAccessParams extends HistoricBaseParams { }
interface GiftListAccessParams extends HistoricBaseParams { }
interface GiftDetailAccessParams extends HistoricBaseParams { giftId: number, }

interface UseHistoricType {
    homeAccess: (params?: HomeAccessParams) => void,
    giftListAccess: (params?: GiftListAccessParams) => void,
    giftDetailAccess: (params?: GiftDetailAccessParams) => void,
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
    
    const handleGiftDetailAccess = async (params?: GiftDetailAccessParams) => {
        let url = "/historic/gift_detail_access?message=Somebody have been access gift " + params?.giftId;

        if (!!params?.aditionalData)
            url += `&aditionalData=${JSON.stringify(params.aditionalData)}`;

        await api.get(url);
    }

    return {
        homeAccess: handleHomeAccess,
        giftListAccess: handleGiftListAccess,
        giftDetailAccess: handleGiftDetailAccess
    }
}

export default useHistoric;