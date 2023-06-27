import { getRandomNum, getRandomValue } from "@/utils/math";
const tableData = [];
for (let i = 0; i < 10; i++) {
  const year = getRandomNum(2000, 2023);
  const month = getRandomNum(0, 11);
  const day = getRandomNum(0, 30);
  const hour = getRandomNum(0, 24);
  const minute = getRandomNum(0, 60);
  const second = getRandomNum(0, 60);
  // 获取当前时间时刻
  tableData.push({
    id: i,
    name: `King${getRandomNum(0, 100)}`,
    age: getRandomNum(0, 100),
    tag: getRandomValue(["A", "B"]),
    address: `London, Park Lane no.${getRandomNum(0, 100)}`,
    date: forMatTime(new Date(year, month, day, hour, minute, second)),
  });
}
export default tableData

function forMatTime(time) {
  return time.getFullYear() + "年" +
    numFn(time.getMonth() + 1) + "月" +
    numFn(time.getDate()) + "日" + ' ' +
    numFn(time.getHours()) + ":" +
    numFn(time.getMinutes()) + ":" +
    numFn(time.getSeconds());
}
//时间补零
function numFn(num) {
  return num < 10 ? "0" + num : num;
}