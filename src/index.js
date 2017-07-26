const fs = require("fs");
const path = require("path");
const Promise = require("bluebird");

const access = Promise.promisify(fs.access);
const readFile = Promise.promisify(fs.readFile);

async function getVars(file) {
  const fileName = path.join(file);
  const exists = await access(fileName).then(() => true).catch(err => {
    console.error(`${fileName} does not exist`);
    process.exit();
  });

  const items = /^([^#\s].*)/gm;
  let envFile = await readFile(fileName, "utf8");

  let m;
  let values = [];
  do {
    m = items.exec(envFile);
    if (m) {
      values.push(m[1].split("="));
    }
  } while (m);

  values = values.map(value => {
    return { [value[0]]: value[1] };
  });

  return values;
}

module.exports = {
  getVars
};
