import { useNavigate } from 'react-router-dom';

import Highlighter from 'react-highlight-words';

export function TableRow({ index, item, onDelete, observable }) {
  const navigate = useNavigate();
  var trList = [];

  //create table data for each property in object except id and highlight search result matches
  for (var key in item) {
    if (key !== 'id') {
      if (key === 'name' || key === 'abrv') {
        trList.push(
          <Highlighter
            searchWords={[observable.search]}
            textToHighlight={item[key]}
          />
        );
      } else {
        trList.push(item[key]);
      }
    }
  }

  return (
    <tr>
      <td>{observable.page * observable.rpp + index + 1}</td>
      {trList.map((item, index) => (
        <td key={index}>{item}</td>
      ))}
      <td>
        <button
          onClick={(e) => {
            navigate(`/edit/${observable.schemaName}/${item.id}`);
          }}
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            onDelete(item.id, observable.schemaName, () => {
              observable.refresh();
            });
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
