import { useState, useEffect } from 'react'

export function createStore<T>(initialState: T) {
  const store = {
    state: initialState,
    setState(value: T) {
      this.state = value;
      this.setters.forEach(setter => setter(this.state));
    },
    setters: []
  };

  // Bind the setState function to the store object so
  // we don't lose context when calling it elsewhere
  store.setState = store.setState.bind(store);

  // this is the custom hook we'll call on components.
  function useStore(): [T, (value: T) => void] {
    const [ state, set ] = useState(store.state);
    if (!store.setters.includes(set)) {
      store.setters.push(set);
    }

    useEffect(() => () => {
      store.setters = store.setters.filter(setter => setter !== set)
    }, [])

    return [ state, store.setState ];
  }

  return {useStore}
}
