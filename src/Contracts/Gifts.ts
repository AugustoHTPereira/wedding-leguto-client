export interface GiftType {
    name: string,
    description?: string,
    type: string,
    url: string,
    pictureUrl: string,
    price?: number,
    ref?: string,
}

export const Gifts: GiftType[] = [
    // {
    //     type: 'external_list',
    //     name: 'Havan',
    //     description: 'Acesse a nossa lista de compras lá na Havan',
    //     url: 'https://www.havan.com.br/',
    //     pictureUrl: 'https://ri.havan.com.br/wp-content/uploads/sites/446/2021/08/untitled-26.png',
    // },
    // {
    //     type: 'payment_link',
    //     name: 'A cama dos pombinhos',
    //     description: 'Ajude os pombinhos a comprar o tão sonhado ninho do amor.',
    //     pictureUrl: '/img/bed.jpg',
    //     price: 299.00,
    //     url: 'https://mpago.la/1JiMnaD',
    //     ref: 'REFGIFT0001'
    // },
    // {
    //     type: 'payment_link',
    //     name: 'Quarto com vista para a praia',
    //     description: 'Os pombinhos merecem uma vista privilegiada.',
    //     pictureUrl: 'https://media.omnibees.com/Images/8259/RoomTypes/246x197/860995.jpg',
    //     price: 199.00,
    //     url: '',
    //     ref: 'REFGIFT0002'
    // },
]