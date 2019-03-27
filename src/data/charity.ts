import fetch from 'isomorphic-fetch'
import { useState, useEffect } from 'react'

import { create, loading, loaded, failed } from '../core/dataState'
import { useNotifications } from './notifications'
import { createStore } from '../core/store'

export interface ICharity {
  id: number
  name: string
  image: string
  currency: string
}

const { useStore } = createStore(true)

export function useCharities() {
  const [initialize, setInitialize] = useStore()

  const [charitiesState, setCharities] = useState(create<ICharity[]>([]))

  const { addNotification } = useNotifications()

  const fetchCharities = () => {
    setCharities(loading(charitiesState))
    fetch('http://localhost:3001/charities')
      .then(response => response.json())
      .then(data => setCharities(loaded(charitiesState, data)))
      .catch(() => {
        const error = new Error('Failed to fetch charities')
        addNotification(
          {
            type: 'error',
            message: error.message,
          },
          5000,
        )
        setCharities(failed(charitiesState, error))
      })
  }

  useEffect(() => {
    if (initialize) {
      fetchCharities()
      setInitialize(false)
    }
  })

  return {
    charitiesState,
  }
}
