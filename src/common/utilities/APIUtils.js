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
  const updateItem = async (data, schemaName) => {
    const rawResponse = await fetch(path + schemaName + '/' + data.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await rawResponse;
  };

  const fetchItems = async (
    page = 0,
    rpp = 10,
    sortBy = 'name',
    search,
    schemaName
  ) => {
    const rawResponse = await fetch(
      path +
        schemaName +
        `/?page=${
          page + 1
        }&rpp=${rpp}&searchQuery=Where name like '%25${search}%25' or abrv like '%25${search}%25' order by ${sortBy}`,
      { method: 'GET' }
    );

    const result = await rawResponse.json();

    return await {
      total: result.totalRecords,
      list: result.item,
    };
  };

  const searchByNameAndAbrv = async (input, vehicleMake) => {
    const rawResponse = await fetch(
      path +
        vehicleMake +
        `/?page=1&rpp=5&searchQuery=WHERE name LIKE '%25${input}%25' OR abrv like '%25${input}%25'`,
      {
        method: 'GET',
      }
    );
    const result = await rawResponse.json();

    return await result.item;
  };
  const findById = async (id, schemaName) => {
    const rawResponse = await fetch(path + schemaName + `/${id}`, {
      method: 'GET',
    });
    const result = await rawResponse.json();

    return await result;
  };

  return {
    fetchItems,
    addItem,
    delItem,
    findById,
    updateItem,
    searchByNameAndAbrv,
  };
}
