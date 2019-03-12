const mkdirp = require('mkdirp');
const tplApply = require('tpl_apply');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const {
  getFilePathAndName,
  firstUpperCase,
  spinner,
} = require('../utils');

module.exports = (name, basePath) => new Promise((resolve) => {
  const {
    file_name,
    fileName,
    filePath
  } = getFilePathAndName(name, basePath);
  spinner.start(`${path.join(filePath, file_name)} is generating......`);

  const camelName = firstUpperCase(fileName);
  const dest = path.join(filePath, `${file_name}.ts`);

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
    const source = path.join(__dirname, '../templates/simple-component.tpl');
    tplApply.tpl_apply(source, {
      camelName,
    }, dest);

    spinner.succeed(`Generate ${dest} success`);
    resolve();
  })
});