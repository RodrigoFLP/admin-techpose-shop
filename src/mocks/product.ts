export const mockProduct = {
  id: 9,
  name: "Torta tradicional",
  description: "Esta es la descripción de la torta tradicional",
  price: 3.99,
  portions: [
    {
      id: 1,
      name: "Normal",
      price: 4.99,
      tagGroups: [
        {
          id: 1,
          name: "proteína",
          max: 1,
          min: 1,
          hidden: false,
          tags: [
            {
              id: 1,
              name: "proteína",
              value: "res",
              price: 0,
              ratio: 0,
            },
            {
              id: 2,
              name: "proteína",
              value: "pollo",
              price: 0.5,
              ratio: 0,
            },
            {
              id: 3,
              name: "proteína",
              value: "cerdo",
              price: 0.75,
              ratio: 0,
            },
          ],
        },
        {
          id: 1,
          name: "complementos",
          max: 6,
          min: 0,
          hidden: false,
          tags: [
            {
              id: 1,
              name: "complementos",
              value: "cebolla",
              price: 0.5,
              ratio: 0,
            },
            {
              id: 2,
              name: "complementos",
              value: "piña",
              price: 0.25,
              ratio: 0,
            },
            {
              id: 3,
              name: "complementos",
              value: "Pimienta",
              price: 0.2,
              ratio: 0,
            },
          ],
        },
      ],
    },
  ],
  tags: [],
  image: "http://dummyimage.com/976x544.png/cc0000/ffffff",
  categories: [
    {
      id: 3,
      name: "Tortas",
      description: "Esta es la descripción de las tortas",
      image: "http://dummyimage.com/660x231.png/cc0000/ffffff",
    },
  ],
  createdAt: "2022-05-22T22:03:21.423Z",
  updatedAt: "2022-05-22T22:03:21.423Z",
};
