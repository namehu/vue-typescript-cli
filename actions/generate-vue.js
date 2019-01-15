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

module.exports = (name, basePath) => new Promise((resolve, reject) => {
  const {
    fileName,
    filePath
  } = getFilePathAndName(name, basePath);
  spinner.start(`${path.join(filePath, fileName)} is generating......`);

  const camelName = firstUpperCase(fileName);
  const dest = path.join(filePath, `${camelName}.vue`);

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
    const source = path.join(__dirname, '../templates/vue.tpl');
    const data = {
      name: fileName,
      camelName,
    };
    tplApply.tpl_apply(source, data, dest);

    const message = path.join(filePath, `${camelName}.vue`);
    spinner.succeed(`Generate ${message} success`);
    resolve();
  })
})