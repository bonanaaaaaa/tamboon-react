import { useState, useEffect } from "react";

import { create, loading, loaded, failed } from "../core/dataState";

export function usePayment() {
  const [initialize, setInitialize] = useState(true);

  const [paymentState, setPayment] = useState(create({
    total: 0,
    payments: []
  }));

  const sumPaymentAmount = payments =>
    payments.reduce((sum, { amount }) => (sum + amount), 0);

  const fetchPayment = () => {
    setPayment(loading(paymentState));
    return fetch("http://localhost:3001/payments")
      .then(response => response.json())
      .then(payments =>
        setPayment(loaded(paymentState, {
          payments: payments,
          total: sumPaymentAmount(payments)
        }))
      )
      .catch(error => setPayment(failed(paymentsState, error)));
  };

  const submitPayment = (charity, amount) => {
    fetch("http://localhost:3001/payments", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        charitiesId: charity.id,
        amount: amount,
        currency: charity.currency
      })
    })
      .then(resp => resp.json())
      .then(() => fetchPayment());
  };

  useEffect(() => {
    if (initialize) {
      fetchPayment();
      setInitialize(false);
    }
  });

  return {
    paymentState,
    submitPayment
  };
}
