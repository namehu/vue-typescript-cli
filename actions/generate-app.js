const mkdirp = require('mkdirp');
const tplApply = require('tpl_apply');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const generateComponent = require('./generate-component');


const {
  getDirPathAndName,
  spinner,
} = require('../utils');

module.exports = (component, basePath) => new Promise((resolve) => {
  let {
    filePath
  } = getDirPathAndName(component, basePath);
  spinner.start(`${filePath} is generating......`);

  // 判断目录是否存在
  let dirExists = false;

  try {
    const stat = fs.statSync(filePath);
    dirExists = stat.isDirectory();
  } catch (error) { }

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
    // 生成main文件
    tplApply.tpl_apply(
      path.join(path.join(__dirname, '../templates/page'), 'main.tpl'),
      {},
      path.join(filePath, 'main.ts')
    );

    // 新建components目录
    const comPath = filePath + '/components';
    mkdirp(comPath, (err) => {
      if (err) {
        console.error(err);
        return resolve();
      }
      // 生成默认app组件
      generateComponent('app', comPath, false, false).then(() => {
        spinner.succeed(`generate ${filePath} success`);
        resolve();
      });
    });

  })
});