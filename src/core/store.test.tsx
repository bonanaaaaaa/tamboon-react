import React, { FunctionComponent } from 'react'
import { shallow } from 'enzyme'
import { createStore } from './store'
import { ReactElementLike } from 'prop-types'

type SChildren = (value: { value: number; set: (v: number) => void }) => ReactElementLike
type RChildren = (value: { value: number }) => ReactElementLike

describe('store', () => {
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

    let sValue: number = 0
    let rValue: number = 0
    let setter: (value: number) => void = () => {}

    const senderFn: SChildren = ({ value: s, set }) => {
      sValue = s
      setter = set

      return <div />
    }

    const receiverFn: RChildren = ({ value: r }) => {
      rValue = r

      return <div />
    }

    shallow(<SenderComponent>{senderFn}</SenderComponent>)
    shallow(<ReceiverComponent>{receiverFn}</ReceiverComponent>)

    expect(sValue).toEqual(0)
    expect(rValue).toEqual(0)
    setter(1)
    expect(sValue).toEqual(1)
    expect(rValue).toEqual(1)
    setter(sValue + 1)
    expect(sValue).toEqual(2)
    expect(rValue).toEqual(2)
  })
})
