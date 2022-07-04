export const initialState = {
  user: {
    uid: "  ",
  },
  authorized: false,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_COINS_USER: "SET_COINS_USER",
  LOGOUT_USER: "LOGOUT_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
        authorized: true,
      };

    case actionTypes.SET_COINS_USER:
      return {
        ...state,
        user: {
          ...state.user,
          data: { ...state.user.data, tokens: action.tokens },
        },
      };

    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        user: null,
        authorized: false,
      };
    default:
      return state;
  }
};

export default reducer;
