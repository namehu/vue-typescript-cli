const ora = require('ora');
const chalk = require('chalk');
const spinnerStyle = require('./spinners.json');
const path = require('path');

const spinner = ora({
  text: chalk.blue('generate begin'),
  spinner: spinnerStyle.dots
});

/**
 * 获取文件路径以及文件名称
 *
 * @export
 * @param {string} name 组件名 可以包含路径
 * @param {string} pathName 组件路径 可以包含路径
 * @returns
 */
function getDirPathAndName(name, pathName) {
  let fileName = '';
  let filePath = '';
  const paths = name.split('/');

  fileName = paths[paths.length - 1];
  fileName = fileName.replace(/[-_](\w)/g, (match, p1) => p1.toUpperCase());


  filePath = path.resolve(pathName, ...paths);
  return {
    fileName,
    filePath,
  }
}

/**
 * 获取文件路径以及文件名称
 * 此方法不会将最末尾的路径认为是目录创建
 *
 * @export
 * @param {string} name 组件名 可以包含路径
 * @param {string} pathName 组件基础路径
 * @returns
 */
function getFilePathAndName(name, pathName) {
  let fileName = '';
  let filePath = '';
  const paths = name.split('/');

  fileName = paths.splice(-1)[0];
  fileName = fileName.replace(/[-_](\w)/g, (match, p1) => p1.toUpperCase());

  filePath = path.resolve(pathName, ...paths);

  return {
    fileName,
    filePath,
  }
}

/**
 * 将文件首字母大写
 *
 * @export
 * @param {string} name
 * @returns
 */
function firstUpperCase(name) {
  let firstLetter = name.slice(0, 1) || '';
  let other = name.slice(1);
  return String(firstLetter).toUpperCase() + other;
}

module.exports = {
  getDirPathAndName,
  firstUpperCase,
  getFilePathAndName,
  spinner,
}