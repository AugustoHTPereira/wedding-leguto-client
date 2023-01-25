export interface GiftType {
    title: string,
    type: string,
    link?: string,
    store?: string,
    obtained: boolean,
    id: number,
    price?: number,
    pictures?: string[],
    guestsId?: number[],
    metadata: { key: string, value: string }[]
}