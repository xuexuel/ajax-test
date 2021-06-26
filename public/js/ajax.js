function noop() { }

function ajax(options) {
  options = {
    ...{
      method: 'get',
      url: '',
      success: noop
    },
    ...options
  }

  if (options.query) {
    let queryString = queryParse(options.query);
    options.url += '?' + queryString;
  }

  let xhr = new XMLHttpRequest();

  xhr.onload = function () {
    options.success(xhr.responseText);
  }
  xhr.onload.onprogress = options.onprogress;
  xhr.onload.onload = options.onload;

  xhr.open(options.method, options.url, true);

  let bodyData = null;
  if (options.data) {
    bodyData = bodyParse(options.data);
  }
  xhr.send(bodyData);
}

function queryParse(obj) {
  let arr = [];
  for (let key in obj) {
    arr.push(`${key}=${obj[key]}`)
  }
  return arr.join('&');
}

function bodyParse(obj) {
  let fd = new FormData();
  for (let key in obj) {
    fd.append(key, obj[key]);
  }
  return fd;
}