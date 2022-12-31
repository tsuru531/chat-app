export function convertComment(text) {
  const textArray = text.split(/(&gt;&gt;\d+)/g);
  let array = [];
  textArray.forEach(item => {
    if (item === '') {
      return false;
    } else if (item.match(/&gt;&gt;(\d+)/)) {
      array = [
        ...array,
        { type: 'anchor', body: item.replace(/&gt;&gt;(\d+)/, '$1') },
      ];
    } else {
      array = [
        ...array,
        { type: 'text', body: item },
      ];
    }
  });
  return array;
}
