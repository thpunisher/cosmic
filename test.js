// test.js
import fetch from "node-fetch";

const data = await fetch("http://api.open-notify.org/astros.json")
  .then(res => res.json())
  .catch(err => console.error(err));

console.log(data);