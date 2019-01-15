const mkdirp = require('mkdirp');
const tplApply = require('tpl_apply');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const {
  getDirPathAndName,
  firstUpperCase,
  spinner,
} = require('../utils');

module.exports = (component, basePath, isView) => new Promise((resolve) => {
  let {
    file_name,
    fileName,
    filePath
  } = getDirPathAndName(component, basePath);
  spinner.start(`${filePath} is generating......`);

  let dirExists = false;

  try {
    const stat = fs.statSync(filePath);
    dirExists = stat.isDirectory();
  } catch (error) {}

  if (dirExists) {
    spinner.fail(chalk.red(`Unable to create ${filePath}: Folder already exists`))
    return resolve();
  }


  // 创建文件夹
  mkdirp(filePath, (err) => {
    if (err) {
      console.error(err);
      return resolve();
    }
    const tplPath = path.join(__dirname, '../templates/component');
    const tpls = fs.readdirSync(tplPath);

    tpls.forEach((element) => {

      const source = path.join(tplPath, element);
      let dest = '';
      let data = {
        name: fileName,
        kebabCaseName: file_name,
        camelName: firstUpperCase(fileName),
      };
      if (element.indexOf('controller') !== -1) {
        dest = path.join(filePath, `${file_name}.ts`);
      } else if (element.indexOf('html') !== -1) {
        dest = path.join(filePath, `${file_name}.html`);
      } else if (element.indexOf('scss') !== -1) {
        dest = path.join(filePath, `${file_name}.scss`);
      } else if (element.indexOf('index') !== -1) {
        dest = path.join(filePath, `index.ts`);
      }
      tplApply.tpl_apply(source, data, dest);
    });

    spinner.succeed(`generate ${filePath} success`);

    if (isView) {
      filePath = path.join(filePath, 'components');
    }
    mkdirp(filePath);
    resolve();

  })
});