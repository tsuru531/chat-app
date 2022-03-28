export const convertToCommentDate = value => {
  const date = new Date(value)
  const padding = number => number.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = padding(date.getMonth() + 1);
  const day = padding(date.getDate());
  const hours = padding(date.getHours());
  const minutes = padding(date.getMinutes());
  const seconds = padding(date.getSeconds());
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};

export const threadOptions = {
  topic: [
    { value: "", label: "なんでもいい"},
    { value: "雑談", label: "雑談" },
  ],
  gender: [
    { value: "", label: "どちらでもいい" },
    { value: "男", label: "男" },
    { value: "女", label: "女" },
  ],
  age: [
    { value: "", label: "何歳でもいい" },
    { value: "10代", label: "10代" },
    { value: "20代", label: "20代" },
    { value: "30代", label: "30代" },
    { value: "40代", label: "40代" },
    { value: "50代", label: "50代" },
    { value: "60代", label: "60代" },
  ],
  place: [
    { value: "", label: "どこでもいい" },
    { value: "東京都", label: "東京都" },
  ],
};

export function shapeFilters(filters) {
  const topics = filters.topics.map(topic => {
    if (topic === "") return undefined;
    return `topic:${topic}`;
  });
  let gender = undefined;
  if (filters.gender !== "") {
    gender = `gender:${filters.gender}`;
  }
  const ages = filters.ages.map(age => {
    if (age === "") return undefined;
    return `age:${age}`;
  });
  const places = filters.places.map(place => {
    if (place === "") return undefined;
    return `place:${place}`;
  });
  const shapedFilters = [topics, gender, ages, places]
      .map(filter => {
        if (typeof filter === 'object') {
          if (filter[0] === undefined) return undefined;
          return `(${filter.join(' OR ')})`;
        }
        if (filter === undefined) return undefined;
        return filter;
      })
      .filter(v => v)
      .join(' AND ');
  return shapedFilters;
}
