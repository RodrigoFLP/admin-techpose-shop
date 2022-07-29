import { Order } from "../interfaces/order";

export const orderMock: Order[] = [
  {
    id: "615a8a9b-f69c-47d2-b583-cd68017722d1",
    couponId: null,
    totalAmount: "7.9600",
    orderType: "delivery",
    scheduledDate: null,
    createdAt: "2022-07-08T21:51:31.280Z",
    updatedAt: "2022-07-08T21:51:31.304Z",
    status: {
      id: 1,
      orderPlaced: "2022-07-08T21:51:31.270Z",
      orderPaid: null,
      orderConfirmed: null,
      orderPrepared: null,
      orderReceived: null,
    },
    ticketItems: [
      {
        id: 1,
        quantity: 4,
        portion: { id: 1, name: "Enchiladitas", price: 1.99 },
        tags: [],
        totalAmount: "7.9600",
        product: {
          id: 4,
          name: "Enchiladitas",
          description: "Esta es la descripción de las enchiladitas",
          price: "1.9900",
          portions: [
            { id: 1, name: "Enchiladitas", price: 1.99, tagGroups: [] },
          ],
          tags: [],
          image: "http://dummyimage.com/129x405.png/cc0000/ffffff",
          createdAt: "2022-07-07T18:46:03.818Z",
          updatedAt: "2022-07-07T18:46:03.818Z",
        },
      },
    ],
  },
  {
    id: "49bccab0-aceb-4c4c-8398-2fdd68ff41a9",
    couponId: null,
    totalAmount: "12.9400",
    orderType: "delivery",
    scheduledDate: null,
    createdAt: "2022-07-08T22:40:11.276Z",
    updatedAt: "2022-07-08T22:40:11.307Z",
    status: {
      id: 2,
      orderPlaced: "2022-07-08T22:40:11.265Z",
      orderPaid: null,
      orderConfirmed: null,
      orderPrepared: null,
      orderReceived: null,
    },
    ticketItems: [
      {
        id: 2,
        quantity: 1,
        portion: { id: 1, name: "3 Tacos", price: 1.99 },
        tags: [
          { id: 1, name: "proteína", price: 1, value: "res", quantity: 1 },
          {
            id: 1,
            name: "complementos",
            price: 1.99,
            value: "salsa verde",
            quantity: 1,
          },
          {
            id: 3,
            name: "complementos",
            price: 0.99,
            value: "queso",
            quantity: 2,
          },
          {
            id: 2,
            name: "complementos",
            price: 2.99,
            value: "salsa roja",
            quantity: 2,
          },
        ],
        totalAmount: "12.9400",
        product: {
          id: 1,
          name: "Tacos",
          description: "Esto es tacos",
          price: "2.9900",
          portions: [
            {
              id: 1,
              name: "3 Tacos",
              price: 1.99,
              tagGroups: [
                {
                  id: 1,
                  max: 1,
                  min: 1,
                  name: "proteína",
                  tags: [
                    {
                      id: 1,
                      name: "proteína",
                      price: 1,
                      ratio: 0,
                      value: "res",
                    },
                    {
                      id: 2,
                      name: "proteína",
                      price: 0,
                      ratio: 0,
                      value: "pollo",
                    },
                    {
                      id: 3,
                      name: "proteína",
                      price: 1.25,
                      ratio: 0,
                      value: "cerdo",
                    },
                  ],
                  hidden: false,
                },
                {
                  id: 2,
                  max: 5,
                  min: 0,
                  name: "complementos",
                  tags: [
                    {
                      id: 1,
                      name: "complementos",
                      price: 1.99,
                      ratio: 0,
                      value: "salsa verde",
                    },
                    {
                      id: 2,
                      name: "complementos",
                      price: 2.99,
                      ratio: 0,
                      value: "salsa roja",
                    },
                    {
                      id: 3,
                      name: "complementos",
                      price: 0.99,
                      ratio: 0,
                      value: "queso",
                    },
                  ],
                  hidden: false,
                },
              ],
            },
            {
              id: 2,
              name: "4 Tacos",
              price: 2.99,
              tagGroups: [
                {
                  id: 1,
                  max: 3,
                  min: 0,
                  name: "complementos",
                  tags: [
                    {
                      id: 1,
                      name: "complementos",
                      price: 0.5,
                      ratio: 0,
                      value: "cebolla",
                    },
                    {
                      id: 2,
                      name: "complementos",
                      price: 0.3,
                      ratio: 0,
                      value: "lechuga",
                    },
                    {
                      id: 3,
                      name: "complementos",
                      price: 0.99,
                      ratio: 0,
                      value: "Pimienta",
                    },
                  ],
                  hidden: false,
                },
              ],
            },
          ],
          tags: [
            { id: 2, name: "pastor", price: 4, ratio: 0, value: "proteina" },
          ],
          image: "http://dummyimage.com/248x253.png/5fa2dd/ffffff",
          createdAt: "2022-07-07T18:45:19.405Z",
          updatedAt: "2022-07-07T18:45:19.405Z",
        },
      },
    ],
  },
];

export default orderMock;
