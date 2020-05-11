import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

// another way of object restructuring, no need to use const
const Table = ({ columns, data, sortColumn, onSort }) => {
  //const Table = props => {
  //const { columns, data, sortColumn, onSort } = props;
  return (
    <table className="table table-striped">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} keyName={"_id"} />

      {/* <tbody>
      {movies.map(movie => (
        <tr key={movie._id}>
          <td>{movie.title}</td>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>
          <td>
            <Like liked={movie.liked} onClick={() => onLike(movie)} />
          </td>
          <td>
            <button
              onClick={() => onDelete(movie)}
              className="btn btn-danger btn-sm fa fa-trash-o"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody> */}
    </table>
  );
};

export default Table;
