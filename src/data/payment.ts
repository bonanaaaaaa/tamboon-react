import fetch from 'isomorphic-fetch'
import { useState, useEffect } from 'react'

import { create, loading, loaded, failed } from '../core/dataState'
import { useNotifications } from './notifications'
import { ICharity } from './charity'

export interface IPayment {
  charitiesId: number
  amount: number
  currency: string
  id: number
}

interface PaymentState {
  total: number
  payments: IPayment[]
}

export function usePayment() {
  const [paymentState, setPaymentState] = useState(
    create<PaymentState>({
      total: 0,
      payments: [],
    }),
  )

  const { addNotification } = useNotifications()

  const sumPaymentAmount = (payments: IPayment[]) => payments.reduce((sum, { amount }) => sum + amount, 0)

  const fetchPayment = async () => {
    setPaymentState(loading(paymentState))
    try {
      const response = await fetch('http://localhost:3001/payments')
      const payments: IPayment[] = await response.json()
      setPaymentState(
        loaded(paymentState, {
          payments,
          total: sumPaymentAmount(payments),
        }),
      )
    } catch (_err) {
      const error = new Error('Failed to fetch payments')
      addNotification(
        {
          type: 'error',
          message: error.message,
        },
        5000,
      )
      setPaymentState(failed(paymentState, error))
    }
  }

  const submitPayment = async (charity: ICharity, amount: number) => {
    try {
      await fetch('http://localhost:3001/payments', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          charitiesId: charity.id,
          amount: amount,
          currency: charity.currency,
        }),
      })
      addNotification(
        {
          type: 'success',
          message: `Thank you for donating to ${charity.name}`,
        },
        5000,
      )
      await fetchPayment()
    } catch (_err) {
      addNotification(
        {
          type: 'error',
          message: `Failed to donate to ${charity.name}`,
        },
        5000,
      )
    }
  }

  useEffect(() => {
    fetchPayment()
  }, [])

  return {
    paymentState,
    submitPayment,
  }
}
