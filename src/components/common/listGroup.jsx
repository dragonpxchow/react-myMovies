import React from "react";
import PropType from "prop-types";

const ListGroup = props => {
  const {
    items,
    textProperty,
    valueProperty,
    selectedItem,
    onItemSelect
  } = props;
  return (
    <ul className="ListGroup">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

// defaultProps make it generic for most object using name and _id, but can override if different
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

ListGroup.propType = {
  items: PropType.array.isRequired,
  onItemSelect: PropType.array.isRequired
};

export default ListGroup;
