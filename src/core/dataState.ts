import DataState from '../types/dataState'
import { ReactNode } from 'react'

export interface IDataState<T> {
  loading: boolean
  data: T
  error: Error | null
}

export function create<T>(data: T): IDataState<T> {
  return {
    loading: false,
    data: data,
    error: null,
  }
}

export function loading<T>(dataState: IDataState<T>): IDataState<T> {
  return {
    ...dataState,
    loading: true,
  }
}

export function loaded<T>(dataState: IDataState<T>, data?: T): IDataState<T> {
  const newData = data != null ? data : dataState.data

  return {
    ...dataState,
    loading: false,
    data: newData,
  }
}

export function failed<T>(dataState: IDataState<T>, error: Error): IDataState<T> {
  return {
    ...dataState,
    loading: false,
    error,
  }
}

interface RenderState<T> {
  loading: (data: T) => ReactNode
  loaded: (data: T) => ReactNode
  failed: (error: Error | null) => ReactNode
}

export function renderByState<T>(dataState: IDataState<T>, renderState: RenderState<T>) {
  if (dataState.loading) {
    return renderState.loading(dataState.data)
  } else if (dataState.error != null) {
    return renderState.failed(dataState.error)
  } else {
    return renderState.loaded(dataState.data)
  }
}
