import { GUEST_LIST, GUEST_ERROR,GLOBAL_GUEST_LIST } from "./guestConstant";
import  { Axios } from "app/services/config";

const setError = (type, error) => ({ type, payload: error });
const clearError = (type) => ({ type, payload: null });

export const onGuestList = (query) => async (dispatch) => {
  try {
    dispatch(clearError(GUEST_ERROR));

    let apiUrl = `/guest/list`;
    if (query) {
      const queryParams = new URLSearchParams(query);
      apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
    }
    const { data } = await Axios.get(apiUrl);

    dispatch({ type: GUEST_LIST, payload: data });
  } catch (error) {
    // setLoading(false);
    dispatch(setError(GUEST_ERROR, error.message));
  } finally {
    // setLoading(false);
  }
};

// export const GlobalGuestList = (query) => async (dispatch) => {
//   try {
//     dispatch(clearError(GUEST_ERROR));

//     let apiUrl = `/guest/guestList`;
//     if (query) {
//       const queryParams = new URLSearchParams(query);
//       apiUrl = apiUrl + (queryParams.toString() ? `?${queryParams.toString()}` : "");
//     }
//     const { data } = await Axios.get(apiUrl);

//     dispatch({ type: GLOBAL_GUEST_LIST, payload: data });
//   } catch (error) {
//     // setLoading(false);
//     dispatch(setError(GUEST_ERROR, error.message));
//   } finally {
//     // setLoading(false);
//   }
// };


