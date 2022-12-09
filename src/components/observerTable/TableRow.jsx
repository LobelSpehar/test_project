import { useNavigate } from 'react-router-dom';

export function TableRow({ position, item, onDelete, onRefresh, schemaName }) {
  const navigate = useNavigate();
  var trList = [];

  //create table data for each property in object except id
  for (var key in item) {
    if (key !== 'id') {
      trList.push(item[key]);
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
