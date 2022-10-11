import { ALLPROFILES, USERPROFILE } from "./Constants";

const initialstate = {
  allprofiles: [],
  userprofile: [],
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
  return {...state};

};
