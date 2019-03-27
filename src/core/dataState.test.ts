import { create, loading, loaded, failed, renderByState, IDataState } from './dataState'

describe('create', () => {
  test('should return correct data with passed data', () => {
    const created = create(1)
    expect(created).toEqual({
      loading: false,
      data: 1,
      error: null,
    })
  })
})

describe('loading', () => {
  let dataState: IDataState<number>
  beforeEach(() => {
    dataState = create(1)
  })

  test('should set loading to true', () => {
    const loadingDataState = loading(dataState)

    expect(loadingDataState).toEqual({
      error: null,
      data: 1,
      loading: true,
    })
  })
})

describe('loaded', () => {
  let dataState: IDataState<number>
  beforeEach(() => {
    dataState = create(1)
  })

  test('should set loading to false', () => {
    const loadedDataState = loaded(dataState)

    expect(loadedDataState).toEqual({
      error: null,
      data: 1,
      loading: false,
    })
  })

  test('should set loading to false and data to passed data', () => {
    const loadedDataState = loaded(dataState, 20)

    expect(loadedDataState).toEqual({
      error: null,
      data: 20,
      loading: false,
    })
  })
})

describe('failed', () => {
  let dataState: IDataState<number>
  beforeEach(() => {
    dataState = create(1)
  })

  test('should set loading to false and error to passed error', () => {
    const error = new Error('error')
    const failedDataState = failed(dataState, new Error('error'))

    expect(failedDataState).toEqual({
      error,
      data: 1,
      loading: false,
    })
  })
})

describe('renderByState', () => {
  let dataState: IDataState<number>
  beforeEach(() => {
    dataState = create(1)
  })

  test('should render loading if dataState is at loading state', () => {
    const loadingDataState = loading(dataState)

    const result = renderByState(loadingDataState, {
      loading: data => `${data}_loading`,
      failed: () => 11,
      loaded: () => 12,
    })

    expect(result).toEqual('1_loading')
  })
  test('should render loaded if dataState is at loaded state', () => {
    const loadedDataState = loaded(dataState, 50)

    const result = renderByState(loadedDataState, {
      loading: () => 12,
      failed: () => 11,
      loaded: data => `${data}_loaded`,
    })

    expect(result).toEqual('50_loaded')
  })
  test('should render error if dataState is at error state', () => {
    const error = new Error('error')
    const loadingDataState = failed(dataState, error)

    const result = renderByState(loadingDataState, {
      loading: () => 11,
      failed: err => err,
      loaded: () => 12,
    })

    expect(result).toEqual(error)
  })
})
