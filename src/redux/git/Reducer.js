import { ALLPROFILES, PERSONALPROFILE, USERPROFILE } from "./Constants";

const initialstate = {
  allprofiles: [],
  userprofile: [],
  personalprofile:{}
};

export const reducerss = (state = initialstate, action) => {
  
  if (action.type === ALLPROFILES) {
    return {
      ...state,
      allprofiles: action.changed,
    };
  }
  if (action.type === USERPROFILE) {
    return {
      ...state,
      userprofile: action.changed,
    };
  }
  if (action.type === PERSONALPROFILE) {
    return {
      ...state,
      personalprofile: action.changed,
    };
  }
  return {...state};

};
