import fetch from 'isomorphic-fetch'
import { useState, useEffect } from 'react'

import { create, loading, loaded, failed } from '../core/dataState'
import { useNotifications } from './notifications'

export interface ICharity {
  id: number
  name: string
  image: string
  currency: string
}

export function useCharities() {
  const [charitiesState, setCharities] = useState(create<ICharity[]>([]))

  const { addNotification } = useNotifications()

  const fetchCharities = async () => {
    try {
      setCharities(loading(charitiesState))
      const response = await fetch('http://localhost:3001/charities')
      const data = await response.json()
      setCharities(loaded(charitiesState, data))
    } catch (_err) {
      const error = new Error('Failed to fetch charities')
      addNotification(
        {
          type: 'error',
          message: error.message,
        },
        5000,
      )
      setCharities(failed(charitiesState, error))
    }
  }

  useEffect(() => {
    fetchCharities()
  }, [])

  return {
    charitiesState,
    fetchCharities,
  }
}
