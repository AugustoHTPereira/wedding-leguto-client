export interface GiftType {
    title: string,
    type: string,
    link?: string,
    store?: string,
    obtained: boolean,
    id: number,
    price?: number,
    pictureUrl?: string,
    guestsId?: number[]
}