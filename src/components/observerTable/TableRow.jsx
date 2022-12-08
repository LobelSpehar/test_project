import { useNavigate } from 'react-router-dom';

export function TableRow({
  page,
  rpp,
  item,
  index,
  onDelete,
  onRefresh,
  schemaName,
}) {
  var trList = [];
  const navigate = useNavigate();
  for (var key in item) {
    if (key !== 'id') {
      trList.push(item[key]);
    }
  }

  return (
    <tr>
      <td>{page * rpp + index + 1}</td>
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
