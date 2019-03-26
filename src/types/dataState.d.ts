interface DataState<T> {
  loading: boolean
  data: T
  error: Error | null
}

export default DataState
