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
    this.sortBy = 'name';
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

  //fetch data
  refresh = async () => {
    const { fetchItems } = APIUtils();
    let result = await fetchItems(
      this.page,
      this.rpp,
      `${this.sortBy} ${this.asc ? 'ASC' : 'DESC'}`,
      this.search,
      this.schemaName
    );
    this.saveData(result.total, result.list);
  };

  //fetch by id local
  getItemById = (id) => this.list.filter((item) => item.id === id)[0];
}

export const dbStore = new DBStore();
