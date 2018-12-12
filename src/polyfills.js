const StringPrototype = String.prototype;

if(!StringPrototype.startsWith) {
  StringPrototype.startsWith = function (searchString, position) {
    if(typeof searchString !== "string") return false;
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  }
}
