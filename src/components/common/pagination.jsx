import React from "react";
import PropTypes from "prop-types";
import _ from "lodash"; // underscore (popular js)

// stateless functional component
// itemCount: total records
// pageSize: total number of records per page
// event: onPageChange

const Pagination = props => {
  const { itemCount, pageSize, currentPage, onPageChange } = props; // code restructing
  const pagesCount = Math.ceil(itemCount / pageSize); // get numbr of pages
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1); // an array of pages

  //console.log("current page >>>", currentPage);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;

/*
class Pagination extends Component {
  render() {
    return (
     
    );
  }
}
export default Pagination;
*/
