import ActionTypes from '../types';

const initialState = {
  loginStatus: false,
  userData: {},
  userProfile: {}
};

const user = (state = initialState, action) => {
  switch (action.type) {

    case ActionTypes.USER_LOGIN:
      return Object.assign({}, state, {
        loginStatus: true
      });
    case ActionTypes.SAVE_USER:
      return Object.assign({}, state, {
        userData: action.payload
      });
    case ActionTypes.SAVE_USER_PROFILE:
      return Object.assign({}, state, {
        userProfile: action.payload
      });
    default:
      return state;
  }
};

export default user;
