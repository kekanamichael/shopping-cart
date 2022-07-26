import * as actionTypes from "./shopping-types";

const INITIAL_STATE = {
  products: [
    {
      id: 1,
      title: "SanDisk 128GB Ultra microSDXC",
      description:
        "SanDisk 128GB Ultra microSDXC UHS-I Memory Card",
      price: 15.0,
      image:
        "https://m.media-amazon.com/images/I/61jhzv9AQRL._AC_UL320_.jpg",
    },
    {
      id: 2,
      title: "2TB External Hard Drive",
      description:
        "Seagate Portable 2TB External Hard Drive Portable HDD",
      price: 20.0,
      image:
        "https://m.media-amazon.com/images/I/81tjLksKixL._AC_SX679_.jpg",
    },
    {
      id: 3,
      title: "Gaming Mouse",
      description:
        "Glorious Model O RGB 67g Lightweight Gaming Mouse, Matte Black (GO-Black)",
      price: 150.0,
      image:
        "https://m.media-amazon.com/images/I/71wmuZLI6xL._AC_SX466_.jpg",
    },
    {
      id: 4,
      title: "MSI Vigor GK30 Combo White,",
      description: "MSI Vigor GK30 Combo White, 6-Zone RGB GK30 Gaming Keyboard & GM11 Gaming Mouse",
      price: 799,
      image: "https://m.media-amazon.com/images/I/71oWwRSUr2L._AC_SX679_.jpg",
      amount: 1,
    },
  ],
  cart: [],
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // Great Item data from products array
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      // Check if Item is in cart already
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );

      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case actionTypes.ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
