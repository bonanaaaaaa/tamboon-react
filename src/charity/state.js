import { useState, useEffect } from "react";

import { create, loading, loaded, failed } from "../core/dataState";

export function useCharities() {
  const [initialize, setInitialize] = useState(true);

  const [charitiesState, setCharities] = useState(create([]));

  const fetchCharities = () => {
    setCharities(loading(charitiesState));
    fetch("http://localhost:3001/charities")
      .then(response => response.json())
      .then(data => setCharities(loaded(charitiesState, data)))
      .catch(error => setCharities(failed(charitiesState, error)));
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
