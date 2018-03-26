import numeral from 'numeral';
import './index.css';
const value = numeral(1000).format('$0,0.00');
console.log(`Converted numeral value: ${value}`); //eslint-disable-line no-console