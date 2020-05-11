import React from "react";
// created by Pei - not in used
// item: list of group item
// evnt onClick

const Filtering = props => {
  const { items, currentItem, onListChange } = props;
  // console.log("Filtering >>>", items + "  --- " + currentItem);
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item}
          className={
            item === currentItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onListChange(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default Filtering;
