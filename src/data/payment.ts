import fetch from 'isomorphic-fetch'
import { useState, useEffect } from 'react'

import { create, loading, loaded, failed } from '../core/dataState'
import { useNotifications } from './notifications'

import Payment from '../types/payment'
import Charity from '../types/charity'

export interface IPayment {
  charitiesId: number
  amount: number
  currency: string
  id: number
}

type PaymentState = {
  total: number
  payments: Payment[]
}

export function usePayment() {
  const [initialize, setInitialize] = useState(true)

  const [paymentState, setPaymentState] = useState(
    create<PaymentState>({
      total: 0,
      payments: [],
    }),
  )

  const { addNotification } = useNotifications()

  const sumPaymentAmount = (payments: Payment[]) => payments.reduce((sum, { amount }) => sum + amount, 0)

  const fetchPayment = () => {
    setPaymentState(loading(paymentState))
    fetch('http://localhost:3001/payments')
      .then(response => response.json())
      .then((payments: Payment[]) =>
        setPaymentState(
          loaded(paymentState, {
            payments: payments,
            total: sumPaymentAmount(payments),
          }),
        ),
      )
      .catch(() => {
        const error = new Error('Failed to fetch payments')
        addNotification(
          {
            type: 'error',
            message: error.message,
          },
          5000,
        )
        setPaymentState(failed(paymentState, error))
      })
  }

  const submitPayment = (charity: Charity, amount: number) => {
    fetch('http://localhost:3001/payments', {
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
      .then(resp => resp.json())
      .then(() => {
        addNotification(
          {
            type: 'success',
            message: `Thank you for donating to ${charity.name}`,
          },
          5000,
        )
      })
      .then(() => fetchPayment())
      .catch(() =>
        addNotification(
          {
            type: 'error',
            message: `Failed to donate to ${charity.name}`,
          },
          5000,
        ),
      )
  }

  useEffect(() => {
    if (initialize) {
      fetchPayment()
      setInitialize(false)
    }
  })

  return {
    paymentState,
    submitPayment,
  }
}
