/* eslint-disable no-plusplus */
const Ship = (type, length, start, end) => {
  let timesHit = 0;
  const hit = () => {
    timesHit += 1;
  };

  const isSunk = () => {
    if (length === timesHit) {
      return true;
    }
    return false;
  };

  return { type, length, start, end, hit, isSunk };
};

export { Ship };
