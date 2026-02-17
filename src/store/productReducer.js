import { api } from "../services/api";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case "PRODUCTS_LOADING":
      return { ...state, loading: true };

    case "PRODUCTS_SUCCESS":
      return { ...state, loading: false, products: action.payload };

    case "PRODUCTS_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCTS_LOADING" });

    const response = await api.get("/products");

    dispatch({
      type: "PRODUCTS_SUCCESS",
      payload: response.data.products,
    });
  } catch (error) {
    dispatch({
      type: "PRODUCTS_ERROR",
      payload: error.message,
    });
  }
};
