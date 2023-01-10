import { useNotifications } from 'common/utilities';

export function APIUtils() {
  const path = process.env.REACT_APP_API_PATH;
  const { errorMsg, infoMsg } = useNotifications();
  const addItem = async (data, schemaName) => {
    try {
      await fetch(path + schemaName, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      errorMsg(error.message);
    } finally {
      infoMsg('Item added successfully');
    }
  };
  const delItem = async (id, schemaName, refresh) => {
    try {
      await fetch(path + schemaName + '/' + id, {
        method: 'DELETE',
      });
    } catch (error) {
      errorMsg(error.message);
    } finally {
      infoMsg('Item deleted successfully');
      refresh();
    }
  };
  const updateItem = async (data, schemaName) => {
    try {
      await fetch(path + schemaName + '/' + data.id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      errorMsg(error.message);
    } finally {
      infoMsg('Item updated successfully');
    }
  };

  const fetchItems = async (page, rpp, sortBy, search, schemaName) => {
    try {
      let searchQuery = `Where name like '%25${search}%25' or abrv like '%25${search}%25' order by ${sortBy}`;
      if (schemaName === 'vehicle') {
        searchQuery = `Where year like '%25${search}%25' or price like '%25${search}%25' or odometer like '%25${search}%25' order by ${sortBy}`;
      }
      const rawResponse = await fetch(
        path +
          schemaName +
          `/?page=${page + 1}&rpp=${rpp}&searchQuery=${searchQuery}`,
        { method: 'GET' }
      );

      const result = await rawResponse.json();

      return {
        total: result.totalRecords,
        list: result.item,
      };
    } catch (error) {
      errorMsg(error.message);
    }
  };

  const searchByNameAndAbrv = async (input, schemaName) => {
    try {
      const rawResponse = await fetch(
        path +
          schemaName +
          `/?page=1&rpp=5&searchQuery=WHERE name LIKE '%25${input}%25' OR abrv like '%25${input}%25'`,
        {
          method: 'GET',
        }
      );
      const result = rawResponse.json();

      return result.item;
    } catch (error) {
      errorMsg(error.message);
    }
  };
  const findById = async (id, schemaName) => {
    try {
      const rawResponse = await fetch(path + schemaName + `/${id}`, {
        method: 'GET',
      });
      const result = rawResponse.json();

      return result;
    } catch (error) {
      console.log(error);
      errorMsg(error.message);
    }
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
