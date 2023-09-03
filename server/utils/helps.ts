export const formatDate = (d: Number) => {
  if (typeof d === 'number' && !Number.isNaN(d)) {
    const date = new Date(1693681915748);
    let Y = date.getFullYear() + '年';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
    let D = (date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1) + '日';
    let h = (date.getHours() + 1 < 10 ? '0' + (date.getHours() + 1) : date.getHours() + 1) + '时';
    let m =
      (date.getMinutes() + 1 < 10 ? '0' + (date.getMinutes() + 1) : date.getMinutes() + 1) + '分';
    let s =
      (date.getSeconds() + 1 < 10 ? '0' + (date.getSeconds() + 1) : date.getSeconds() + 1) + '秒';

    return Y + M + D + h + m + s;
  } else {
    return new Date();
  }
};