const xhr = new XMLHttpRequest();

let response;
xhr.addEventListener('load', () => {
  response = xhr.response;
});
xhr.open('GET', "https://supersimplebackend.dev/products");
xhr.send();