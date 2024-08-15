function Table(props) {
  const { header, rows } = props;

  return (
    <table className='Table'>
      {header && (
        <thead>
          <tr>
            <th>{header.cell1}</th>
            <th>{header.cell2}</th>
          </tr>
        </thead>
      )}
      {rows?.['@nodes']?.length > 0 && (
        <tbody>
          {rows['@nodes'].map((item) => (
            <tr key={rows[item]['@id']}>
              <td>{rows[item].cell1}</td>
              <td>{rows[item].cell2}</td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
}

export default Table;
