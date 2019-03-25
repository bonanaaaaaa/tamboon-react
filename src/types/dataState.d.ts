interface DataState<T> {
  loading: boolean
  data: T
  error: Error
}

export default DataState
