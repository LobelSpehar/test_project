import { vehicleMakeStore } from '../../stores/makeStore';

export function APIUtils() {
  const path = process.env.REACT_APP_API_PATH;

  const addMake = async (data) => {
    const rawResponse = await fetch(path, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: null,
        name: 'test',
        abrv: 'Textual content',
      }),
    });
    const result = await rawResponse.json();
    console.log(result);
  };
  const delMake = async (id) => {};
  const updateMake = async (id) => {};
  const fetchMakeList = async (page = 1, rpp = 10, sortBy = 'name') => {
    const rawResponse = await fetch(
      path + `?page=${page}&rpp=${rpp}&sort=${sortBy}`,
      { method: 'GET' }
    );
    const result = await rawResponse.json();

    vehicleMakeStore.createMake(result.item);
  };
  return { fetchMakeList, addMake };
}
