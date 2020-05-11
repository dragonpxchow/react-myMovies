import _ from "lodash"; // underscore (popular js)

// paginate data on client size
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items) // chain lodash method as below
    .slice(startIndex) // slice array from startIndex
    .take(pageSize) // tkae the number of items
    .value(); // convert back to primitive array
  //_.slice(items, startIndex);
  //-.take(pageSize)
  // _.value()
}
