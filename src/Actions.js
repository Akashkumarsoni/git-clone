import { ALLPROFILES, USERPROFILE } from "./Constants";

export const fetching_all_profiles = (a) => {
  return {
    type: ALLPROFILES,
    changed:a
  };
};

export const fetching_all_profiles2 = (a) => {
  return {
    type: USERPROFILE,
    changed:a
  };
};