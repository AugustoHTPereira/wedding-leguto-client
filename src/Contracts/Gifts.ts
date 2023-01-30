export interface GiftType {
    title: string,
    type: string,
    link?: string,
    store?: string,
    obtained: boolean,
    category: string,
    id: number,
    price?: number,
    pictures?: string[],
    guestsId?: number[],
    metadata: { key: string, value: string }[]
}