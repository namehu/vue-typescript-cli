const mkdirp = require('mkdirp');
const tplApply = require('tpl_apply');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const {
  getFilePathAndName,
  // firstUpperCase,
  spinner,
} = require('../utils');

module.exports = (name, basePath) => new Promise((resolve, reject) => {
  const {
    file_name,
    filePath
  } = getFilePathAndName(name, basePath);
  spinner.start(`${path.join(filePath, file_name)} is generating......`);

  // const camelName = firstUpperCase(fileName);
  const dest = path.join(filePath, `${file_name}.directive.ts`);

  let fileExists = false;
  try {
    const stat = fs.statSync(dest);
    if (stat.isFile()) {
      fileExists = true;
    }
  } catch (error) {}

  if (fileExists) {
    let message = 'Unable to create ';
    message += dest;
    message += ' : File already exists';
    spinner.fail(chalk.red(message));

    return resolve();
  }
  mkdirp(filePath, (err) => {
    if (err) {
      return reject(err);
    }
    const source = path.join(__dirname, '../templates/directive.ts');
    tplApply.tpl_apply(source, {}, dest);

    spinner.succeed(`Generate ${dest} success`);
    resolve();
  })
})