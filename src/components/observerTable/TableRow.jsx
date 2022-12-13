import { useNavigate } from 'react-router-dom';

import Highlighter from 'react-highlight-words';

export function TableRow({
  position,
  item,
  onDelete,
  onRefresh,
  schemaName,
  search,
}) {
  const navigate = useNavigate();
  var trList = [];

  //create table data for each property in object except id and highlight search result matches
  for (var key in item) {
    if (key !== 'id') {
      if (key === 'name' || key === 'abrv') {
        trList.push(
          <Highlighter searchWords={[search]} textToHighlight={item[key]} />
        );
      } else {
        trList.push(item[key]);
      }
    }
  }

  return (
    <tr>
      <td>{position}</td>
      {trList.map((item, index) => (
        <td key={index}>{item}</td>
      ))}
      <td>
        <button
          onClick={(e) => {
            navigate(`/edit/${schemaName}/${item.id}`);
          }}
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            onDelete(item.id, schemaName, onRefresh);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
