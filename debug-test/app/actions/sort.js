export const ChangeSort = 'canny/posts/change_sort';
export function changeSort(sort) {
  return {
    //sort,
    sort: sort, // Include the sort value in the action payload
    type: ChangeSort,
  };
}
