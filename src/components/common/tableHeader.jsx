import React, { Component } from "react";
// columns: array
// sortColumn: object
// onSort: function

class TableHeader extends Component {
  raiseSort = path => {
    //console.log(path);
    // if same path, then reverse the sort
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      //console.log(">>>>>> 1.0", sortColumn.order);
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
      //console.log(">>>>>> 1.1", sortColumn.order);
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
      //console.log(">>>>>> 2");
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc")
      return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
    return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
  };
  render() {
    return (
      <thead className=" thead-dark">
        <tr>
          {this.props.columns.map(column => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
