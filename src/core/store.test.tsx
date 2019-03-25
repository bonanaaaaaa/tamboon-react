import React from 'react'
import { shallow } from 'enzyme'
import { createStore } from './store'

describe('store', () => {
  test('should store things globally', () => {
    const { useStore } = createStore({})

    const useSender = () => {
      const [s, set] = useStore()

      return { s, set }
    }

    const useReceiver = () => {
      const [r] = useStore()

      return { r }
    }

    function SenderComponent({ render }) {
      const { s, set } = useSender()

      return render({
        s,
        set,
      })
    }
    function ReceiverComponent({ render }) {
      const { r } = useReceiver()

      return render({
        r,
      })
    }

    let sValue
    let rValue
    let setter

    function senderFn({ s, set }) {
      sValue = s
      setter = set
    }

    function receiverFn({ r }) {
      rValue = r
    }

    shallow(<SenderComponent render={senderFn} />)
    shallow(<ReceiverComponent render={receiverFn} />)

    expect(sValue).toEqual({})
    expect(rValue).toEqual({})
    setter({ a: 1 })
    expect(sValue).toEqual({ a: 1 })
    expect(rValue).toEqual({ a: 1 })
    setter({
      ...sValue,
      b: 2,
    })
    expect(sValue).toEqual({ a: 1, b: 2 })
    expect(rValue).toEqual({ a: 1, b: 2 })
  })
})
