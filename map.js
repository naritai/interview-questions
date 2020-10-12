function MapCreator() {
  const mapObj = {};

  const isObject = key => key !== null && (typeof key === "object" || typeof key === "function");
  const creatKey = key => isObject(key) ? Symbol.for(key) : key;

  const set = (key, value) => {mapObj[creatKey(key)] = value};
  const get = (key) => mapObj[creatKey(key)];
  const has = (key) => mapObj[creatKey(key)] ? true : false;
  const clear = () => Reflect.ownKeys(mapObj).forEach(key => delete mapObj[key]);
  const forEach = (cb) => Reflect.ownKeys(mapObj).forEach(key => cb(mapObj[key], key));
  const del = (key) => delete mapObj[creatKey(key)];
  const size = () => Reflect.ownKeys(mapObj).length;

  return { set, get, del, has, clear, forEach, size };
}

const objAsKey = {
  name: "Naritai",
};

const imitatedMap = MapCreator();
imitatedMap.set(objAsKey, "Object as a key");
imitatedMap.set(123, "Just a number as a key");
imitatedMap.set(null, "Null as a key");


console.log('************************ FIRST CHECK ************************');
console.log('imitatedMap size :', imitatedMap.size());
imitatedMap.forEach((item, idx) => {
    console.log(item, idx);
});
console.log('************************     END    ************************');

console.log('************************ SECOND CHECK ************************');
imitatedMap.del(objAsKey);
console.log('Object objAsKey should be removed now')
console.log('imitatedMap size :', imitatedMap.size());
imitatedMap.forEach((item, idx) => {
    console.log(item, idx);
});
console.log('************************     END    ************************');



