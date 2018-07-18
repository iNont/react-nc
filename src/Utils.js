const deepCopy = function(ele) {
  if(typeof ele === "object" && ele !== null) {
    if(Array.isArray(ele)) {
      return [...ele.map(e=>deepCopy(e))];
    }
    let result = {};
    Object.keys(ele).forEach(e=>{
      result[e] = deepCopy(ele[e]);
    });
    return result;
  }
  return ele;
}

const jsonToQueryString = function(json) {
  return '?' + Object.keys(json).map(function(key) {
    if(json[key] !== null) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    }
    return '';
  }).join('&');
}
const queryStringToJSON = function(queryString) {
  if(queryString.indexOf('?') > -1) {
    queryString = queryString.split('?')[1];
  }
  let pairs = queryString.split('&');
  let result = {};
  pairs.forEach(function(pair) {
    pair = pair.split('=');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  });
  return result;
}

export {
  deepCopy,
  jsonToQueryString,
  queryStringToJSON
}
