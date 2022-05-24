export const initialState = {
  user: {
    uid: "  ",
  },
  authorized: false,
};

export const actionTypes = {
  SET_USER: "SET_USER",
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
