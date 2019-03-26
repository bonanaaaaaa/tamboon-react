import React, { FunctionComponent } from 'react'
import { render, act, cleanup } from 'react-testing-library'
import { createStore } from './store'
import { ReactElementLike } from 'prop-types'
import 'jest-dom/extend-expect'

type SChildren = (value: { value: number; set: (v: number) => void }) => ReactElementLike
type RChildren = (value: { value: number }) => ReactElementLike

describe('store', () => {
  afterEach(cleanup)

  test('should store things globally', () => {
    const { useStore } = createStore(0)

    const useSender = () => {
      const [s, set] = useStore()

      return { s, set }
    }

    const useReceiver = () => {
      const [r] = useStore()

      return { r }
    }

    const SenderComponent: FunctionComponent<{ children: SChildren }> = ({ children }) => {
      const { s, set } = useSender()

      return children({
        value: s,
        set,
      })
    }
    const ReceiverComponent: FunctionComponent<{ children: RChildren }> = ({ children }) => {
      const { r } = useReceiver()

      return children({
        value: r,
      })
    }

    let sValue1: number = 0
    let setter1: (value: number) => void = () => {}
    let setter2: (value: number) => void = () => {}

    const senderFn1: SChildren = ({ value, set }) => {
      sValue1 = value
      setter1 = set

      return <div>{value}</div>
    }
    const senderFn2: SChildren = ({ value, set }) => {
      setter2 = set

      return <div>{value}</div>
    }

    const receiverFn: RChildren = ({ value }) => <div>{value}</div>

    let senderWrapper1 = render(<SenderComponent>{senderFn1}</SenderComponent>)
    const senderWrapper2 = render(<SenderComponent>{senderFn2}</SenderComponent>)
    const receiverWrapper = render(<ReceiverComponent>{receiverFn}</ReceiverComponent>)

    expect(senderWrapper1.container).toHaveTextContent('0')
    expect(senderWrapper2.container).toHaveTextContent('0')
    expect(receiverWrapper.container).toHaveTextContent('0')
    act(() => setter1(1))
    expect(senderWrapper1.container).toHaveTextContent('1')
    expect(senderWrapper2.container).toHaveTextContent('1')
    expect(receiverWrapper.container).toHaveTextContent('1')
    act(() => setter2(2))
    expect(senderWrapper1.container).toHaveTextContent('2')
    expect(senderWrapper2.container).toHaveTextContent('2')
    expect(receiverWrapper.container).toHaveTextContent('2')
    senderWrapper1.unmount()
    act(() => setter2(10))
    expect(sValue1).toEqual(2)
    expect(senderWrapper2.container).toHaveTextContent('10')
    expect(receiverWrapper.container).toHaveTextContent('10')
  })
})
