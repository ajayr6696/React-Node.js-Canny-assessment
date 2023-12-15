export default function sortBy(array, key, descending = false) {
  const length = array.length;
  // sorting by created time
  if (key === 'created') {
    if (length === 1) {
      return array;
    } else if (length === 2) {
      const aValue = array[0][key];
      const bValue = array[1][key];
      if (bValue > aValue) {
        return array;
      }
      return [array[0], array[1]];
    }

    const mid = Math.floor(length / 2);
    const firstHalf = array.slice(0, mid);
    const secondHalf = array.slice(mid, length);

    const arrayOne = sortBy(firstHalf, key);
    const arrayTwo = sortBy(secondHalf, key);

    const merged = [];
    while (arrayOne.length || arrayTwo.length) {
      if (!arrayOne.length) {
        merged.push(arrayTwo.shift());
        continue;
      }

      if (!arrayTwo.length) {
        merged.push(arrayOne.shift());
        continue;
      }

      const valueOne = arrayOne[0][key];
      const valueTwo = arrayTwo[0][key];
      if (valueOne <= valueTwo) {
        merged.push(arrayOne.shift());
      } else if (valueTwo < valueOne) {
        merged.push(arrayTwo.shift());
      }
    }

    return descending ? merged.reverse() : merged;
  } else if (key === 'votes') { // Sorting by votes
    if (length <= 1) {
      return array;
    }

    const sortVotes = (a, b) => {
      const aValue = Number(a[key]);
      const bValue = Number(b[key]);

      if (descending) {
        return bValue - aValue;
      } else {
        return aValue - bValue;
      }
    };

    return array.slice().sort(sortVotes);
  }
  // Default case for other types of sorting or keys
  return [...array];
}
