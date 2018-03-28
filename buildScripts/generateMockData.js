import jsf from 'json-schema-faker';
import { schema } from './mockDataSchema';
import fs from 'fs';
import chalk from 'chalk';
import faker from "faker"

jsf.extend("faker", function () {
  return faker
});
fs.writeFile('./src/api/db.json', JSON.stringify(jsf(schema), null, 2), function (err) {
  if (err) {
    return (console.log(chalk.reds(err))); //eslint-disable-line no-console
  } else {
    console.log(chalk.green('Mock Data Generated')); //eslint-disable-line no-console
  }
});
