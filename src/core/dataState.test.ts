import * as DataState from './dataState'

describe('create', () => {
  test('should return correct data with passed data', () => {
    const created = DataState.create(1)
    expect(created).toEqual({
      loading: false,
      data: 1,
      error: null
    })
  })
})

describe('loading', () => {
  let dataState
  beforeEach(() => {
    dataState = DataState.create(1)
  })

  test('should set loading to true', () => {
    const loadingDataState = DataState.loading(dataState)

    expect(loadingDataState).toEqual({
      error: null,
      data: 1,
      loading: true,
    })
  })
})

describe('loaded', () => {
  let dataState
  beforeEach(() => {
    dataState = DataState.create(1)
  })

  test('should set loading to false', () => {
    const loaded = DataState.loaded(dataState)

    expect(loaded).toEqual({
      error: null,
      data: 1,
      loading: false,
    })
  })

  test('should set loading to false and data to passed data', () => {
    const loaded = DataState.loaded(dataState, 20)

    expect(loaded).toEqual({
      error: null,
      data: 20,
      loading: false,
    })
  })
})

describe('failed', () => {
  let dataState
  beforeEach(() => {
    dataState = DataState.create(1)
  })

  test('should set loading to false and error to passed error', () => {
    const error = new Error('error')
    const loaded = DataState.failed(dataState, new Error('error'))

    expect(loaded).toEqual({
      error,
      data: 1,
      loading: false,
    })
  })
})

describe('renderByState', () => {
  let dataState
  beforeEach(() => {
    dataState = DataState.create(1)
  })

  test('should render loading if dataState is at loading state', () => {
    const loadingDataState = DataState.loading(dataState)

    const result = DataState.renderByState(loadingDataState, {
      loading: (data) => `${data}_loading`,
      error: () => 11,
      loaded: () => 12
    })

    expect(result).toEqual('1_loading')
  })
  test('should render loaded if dataState is at loaded state', () => {
    const loadedDataState = DataState.loaded(dataState, 50)

    const result = DataState.renderByState(loadedDataState, {
      loading: () => 12,
      error: () => 11,
      loaded: (data) => `${data}_loaded`
    })

    expect(result).toEqual('50_loaded')
  })
  test('should render error if dataState is at error state', () => {
    const error = new Error('error')
    const loadingDataState = DataState.failed(dataState, error)

    const result = DataState.renderByState(loadingDataState, {
      loading: () => 11,
      error: (err) => err,
      loaded: () => 12
    })

    expect(result).toEqual(error)
  })
})