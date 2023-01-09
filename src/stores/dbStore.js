import { action, makeObservable, observable } from 'mobx';

import { APIUtils } from 'common/utilities';

class DBStore {
  //stored data
  total = 0;
  list = [];
  page = 0;
  sortBy = 'name';
  rpp = 10;
  search = '';
  schemaName = '';
  asc = true;
  loading = true;

  constructor() {
    makeObservable(this, {
      total: observable,
      list: observable,
      page: observable,
      sortBy: observable,
      rpp: observable,
      search: observable,
      schemaName: observable,
      asc: observable,
      loading: observable,
    });
  }

  //setState
  setPage = action((val) => {
    this.page = this.page + val;
    this.refresh();
  });
  setSortBy = action((val) => {
    if (this.sortBy === val) {
      this.toggleAsc();
    } else {
      this.sortBy = val;
      this.asc = true;
    }
    this.refresh();
  });
  setRpp = action((val) => {
    this.rpp = val;
    this.refresh();
  });
  setSearch = action((val) => {
    this.search = val;
    this.refresh();
  });
  setSchemaName = action((val) => {
    this.schemaName = val;
    this.page = 0;
    if (this.schemaName === 'vehicle') {
      this.sortBy = 'year';
    } else {
      this.sortBy = 'name';
    }
    this.rpp = 10;
    this.search = '';
    this.asc = true;
    this.refresh();
  });
  toggleAsc = action(() => {
    this.asc = !this.asc;
    this.refresh();
  });

  //store fetched data
  saveData = action((total, list) => {
    this.total = total;
    this.list = list;
  });
  setLoading = action((state) => {
    this.loading = state;
  });
  //fetch data
  refresh = async () => {
    this.setLoading(true);

    const { fetchItems } = APIUtils();
    const result = await fetchItems(
      this.page,
      this.rpp,
      `${this.sortBy} ${this.asc ? 'ASC' : 'DESC'}`,
      this.search,
      this.schemaName
    );
    this.saveData(result.total, result.list);
    this.setLoading(false);
  };

  //fetch by id local
  getItemById = (id) => this.list.filter((item) => item.id === id)[0];
}

export const dbStore = new DBStore();
