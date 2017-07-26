#! /usr/bin/env node
const program = require("commander");

const envExport = require("../src/index");
const pkg = require("../package.json");

program
  .version(pkg.version)
  .option("-o, --object", "return values as object instead of array")
  .parse(process.argv);

envExport
  .getVars(program.args[0] || ".env")
  .then(vars => {
    if (program.object) {
      let values = {};
      vars.forEach(item => {
        values[Object.keys(item)[0]] = Object.values(item)[0];
      });
      vars = values;
    }
    console.log(JSON.stringify(vars));
    process.exit();
  })
  .catch(err => {
    console.error("error", err);
    process.exit();
  });
