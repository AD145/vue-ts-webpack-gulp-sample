interface Map<K,V> {
  keys():Array<K>;
}

Map.prototype.keys = () => {
  let _self = this as Map;
  return Object.keys(this);
};

