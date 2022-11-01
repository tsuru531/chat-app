export const threadOptions = {
  topic: [
    { value: "", label: "なんでもいい"},
    { value: "雑談", label: "雑談" },
    { value: "ニュース", label: "ニュース" },
    { value: "実況", label: "実況" },
    { value: "スポーツ", label: "スポーツ" },
    { value: "ゲーム", label: "ゲーム" },
    { value: "漫画", label: "漫画" },
    { value: "音楽", label: "音楽" },
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
    { value: "70代", label: "70代" },
    { value: "80代", label: "80代" },
    { value: "90代", label: "90代" },
  ],
  place: [
    { code: 0, value: "", label: "どこでもいい" },
    { code: 1, value: "北海道", label: "北海道" },
    { code: 2, value: "青森県", label: "青森県" },
    { code: 3, value: "岩手県", label: "岩手県" },
    { code: 4, value: "宮城県", label: "宮城県" },
    { code: 5, value: "秋田県", label: "秋田県" },
    { code: 6, value: "山形県", label: "山形県" },
    { code: 7, value: "福島県", label: "福島県" },
    { code: 8, value: "茨城県", label: "茨城県" },
    { code: 9, value: "栃木県", label: "栃木県" },
    { code: 10, value: "群馬県", label: "群馬県" },
    { code: 11, value: "埼玉県", label: "埼玉県" },
    { code: 12, value: "千葉県", label: "千葉県" },
    { code: 13, value: "東京都", label: "東京都" },
    { code: 14, value: "神奈川県", label: "神奈川県" },
    { code: 15, value: "新潟県", label: "新潟県" },
    { code: 16, value: "富山県", label: "富山県" },
    { code: 17, value: "石川県", label: "石川県" },
    { code: 18, value: "福井県", label: "福井県" },
    { code: 19, value: "山梨県", label: "山梨県" },
    { code: 20, value: "長野県", label: "長野県" },
    { code: 21, value: "岐阜県", label: "岐阜県" },
    { code: 22, value: "静岡県", label: "静岡県" },
    { code: 23, value: "愛知県", label: "愛知県" },
    { code: 24, value: "三重県", label: "三重県" },
    { code: 25, value: "滋賀県", label: "滋賀県" },
    { code: 26, value: "京都府", label: "京都府" },
    { code: 27, value: "大阪府", label: "大阪府" },
    { code: 28, value: "兵庫県", label: "兵庫県" },
    { code: 29, value: "奈良県", label: "奈良県" },
    { code: 30, value: "和歌山県", label: "和歌山県" },
    { code: 31, value: "鳥取県", label: "鳥取県" },
    { code: 32, value: "島根県", label: "島根県" },
    { code: 33, value: "岡山県", label: "岡山県" },
    { code: 34, value: "広島県", label: "広島県" },
    { code: 35, value: "山口県", label: "山口県" },
    { code: 36, value: "徳島県", label: "徳島県" },
    { code: 37, value: "香川県", label: "香川県" },
    { code: 38, value: "愛媛県", label: "愛媛県" },
    { code: 39, value: "高知県", label: "高知県" },
    { code: 40, value: "福岡県", label: "福岡県" },
    { code: 41, value: "佐賀県", label: "佐賀県" },
    { code: 42, value: "長崎県", label: "長崎県" },
    { code: 43, value: "熊本県", label: "熊本県" },
    { code: 44, value: "大分県", label: "大分県" },
    { code: 45, value: "宮崎県", label: "宮崎県" },
    { code: 46, value: "鹿児島県", label: "鹿児島県" },
    { code: 47, value: "沖縄県", label: "沖縄県" },
    { code: 101, value: "海外", label: "海外" },
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
