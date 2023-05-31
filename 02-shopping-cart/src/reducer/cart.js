export const initialState =
  JSON.parse(window.localStorage.getItem("cart")) || [];

//update localeStorage with state for cart
export const updateLocaleStorage = (state) => {
  window.localStorage.setItem("cart", JSON.stringify(state));
};
export const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;
  switch (actionType) {
    case "ADD_TO_CART": {
      const productInCartIndex = state.findIndex(
        (item) => item.id === actionPayload.id
      );
      if (productInCartIndex >= 0) {
        /* una forma usando  structuredClone*/
        const newState = structuredClone(state);
        newState[productInCartIndex].quantity += 1;
        return newState;
      }
      //product is not in the cart

      const newState = [
        ...state,
        {
          ...actionPayload,
          quantity: 1,
        },
      ];
      updateLocaleStorage(newState);
      return newState;
    }

    case "REMOVE_FROM_CART": {
      const newState = state.filter((e) => e.id !== actionPayload.id);
      updateLocaleStorage(newState);
      return newState;
    }

    case "CLEAR_CART": {
      updateLocaleStorage(initialState);
      return initialState;
    }
  }
  return state;
};
