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
    const data = {
      name: fileName,
      kebabCaseName: file_name,
      camelName: firstUpperCase(fileName),
    };

    const tplPath = path.join(__dirname, '../templates/component');
    let tpls = [];
    if (isView) {
      tpls = [
        { source: 'scss.tpl', dest: `${file_name}.scss` },
        { source: 'html.tpl', dest: `${file_name}.render.html` },
        { source: 'index-with-service.tpl', dest: 'index.ts' },
        { source: 'service.tpl', dest: `${file_name}.service.ts` },
      ];

    } else {
      tpls = [
        { source: 'scss.tpl', dest: `${file_name}.scss` },
        { source: 'html.tpl', dest: `${file_name}.render.html` },
        { source: 'index.tpl', dest: 'index.ts' },
      ];
    }

    // const tpls = fs.readdirSync(tplPath);
    tpls.forEach(({ source, dest }) => {
      tplApply.tpl_apply(
        path.join(tplPath, source),
        data,
        path.join(filePath, dest)
      );
    });

    spinner.succeed(`generate ${filePath} success`);

    if (isView) {
      filePath = path.join(filePath, 'components');
    }
    mkdirp(filePath);
    resolve();

  })
});