import './assets/index.css';
import './assets/main.less';
const picture = require('./assets/img/222.jpg');
const testFun = () => {
    console.log('箭头函数');
}

const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
testFun();
console.log('call me sally, this is index');