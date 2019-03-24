import { useState, useEffect } from "react";

import { create, loading, loaded, failed } from "../core/dataState";
import { useError } from "../core/error";
import { createStore } from "../core/store";

const { useStore } = createStore(true)

export function useCharities() {
  const [initialize, setInitialize] = useStore();

  const [charitiesState, setCharities] = useState(create([]));

  const { addError } = useError()

  const fetchCharities = () => {
    setCharities(loading(charitiesState));
    fetch("http://localhost:3001/charities")
      .then(response => response.json())
      .then(data => setCharities(loaded(charitiesState, data)))
      .catch(() => {
        const error = new Error('Failed to fetch charities')
        addError(error, 5000)
        setCharities(failed(charitiesState, error))
      });
  };

  useEffect(() => {
    if (initialize) {
      fetchCharities();
      setInitialize(false);
    }
  });

  return {
    charitiesState
  };
}
