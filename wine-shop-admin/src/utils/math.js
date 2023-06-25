export const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getRandomValue = (arr) => {
  return arr[getRandomNum(0, arr.length - 1)];
}