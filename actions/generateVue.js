const mkdirp = require('mkdirp');
const tplApply = require('tpl_apply');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const {
  getPathAndName,
  firstUpperCase,
  spinner,
} = require('../utils');


module.exports = function (name) {
  spinner.start(name + ' is generating......');

  return new Promise((resolve, reject) => {
    const {
      filePath,
      fileName
    } = getPathAndName(name, 'src/components');
    const camelName = firstUpperCase(fileName);
    const dest = path.join(filePath, `${camelName}.vue`);


    if (fs.existsSync(dest)) {
      let message = 'Unable to create ';
      message += path.join(filePath, `${camelName}.vue`);
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


}