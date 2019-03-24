export const LOADING = "LOADING";
export const ERROR = "ERROR";
export const LOADED = "LOADED";

export function create(data = null) {
  return {
    loading: false,
    data: data,
    error: null
  };
}

export function loading(dataState) {
  return {
    ...dataState,
    loading: true
  };
}

export function loaded(dataState, data) {
  const newData = data != null ? data : dataState.data

  return {
    ...dataState,
    loading: false,
    data: newData
  };
}

export function failed(dataState, error) {
  return {
    ...dataState,
    loading: false,
    error
  };
}

export function renderByState(dataState, renderState) {
  if (dataState.loading) {
    return renderState.loading(dataState.data);
  } else if (dataState.error != null) {
    return renderState.error(dataState.error);
  } else {
    return renderState.loaded(dataState.data);
  }
}
