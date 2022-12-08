export function APIUtils() {
  const path = process.env.REACT_APP_API_PATH;

  const addItem = async (data, schemaName) => {
    const rawResponse = await fetch(path + schemaName, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await rawResponse.json();
  };
  const delItem = async (id, schemaName, refresh) => {
    const rawResponse = await fetch(path + schemaName + '/' + id, {
      method: 'DELETE',
    }).then(() => {
      refresh();
    });
    const result = await rawResponse;
  };
  const updateItem = async (id, schemaName) => {};
  const fetchAllMakes = async (db) => {
    const rawResponse = await fetch(
      path + `VehicleMake/?page=1&rpp=1000&sort=name`,
      { method: 'GET' }
    );
    const result = await rawResponse.json();

    db.setData(result.totalRecords, result.item);
  };
  const fetchItems = async (
    page = 0,
    rpp = 10,
    sortBy = 'name',
    schemaName,
    store
  ) => {
    const rawResponse = await fetch(
      path + schemaName + `/?page=${page + 1}&rpp=${rpp}&sort=${sortBy}`,
      { method: 'GET' }
    );
    const result = await rawResponse.json();

    store.setData(result.totalRecords, result.item);
  };
  return { fetchItems, addItem, delItem, fetchAllMakes };
}
