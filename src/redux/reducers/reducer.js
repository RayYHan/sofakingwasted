import { PUT_LOGO, PUT_SHELF, PUT_WHISKEY } from '../actions/actions';

const initialState = {
  logo: '',
  shelf: '',
  whiskeys: {}
}

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case PUT_LOGO:
      return {
        logo: action.logo
      };
    case PUT_SHELF:
      return {
        shelf: action.shelf
      };
    case PUT_WHISKEY:
      return {
        whiskeys: {
          ...state.whiskeys,
          [action.id]: {
            ...action.whiskey,
            img_url: action.img_url
          }
        }
      }
    default:
      return state;
  }
}

export default rootReducer;
