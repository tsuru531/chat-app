export function convertComment(text) {
  const textArray = text.split(/(>>\d+)/g).filter(v => v !== '');
  let array = [];
  textArray.forEach((item, index) => {
    if (item.match(/>>(\d+)/)) {
      array = [
        ...array,
        { type: 'anchor', body: item.replace(/>>(\d+)/, '$1'), key: index },
      ];
    } else {
      array = [
        ...array,
        { type: 'text', body: item, key: index },
      ];
    }
  });
  return array;
}
