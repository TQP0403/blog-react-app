export const FetchDataActionType = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR'
};

export const FETCH_DATA_INIT_STATE = {
  loading: false,
  data: null,
  error: null
};

export const fetchDataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload.error
      };
    default:
      return state;
  }
};
