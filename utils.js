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
 * @param {string} basePath 基础路径。默认为src目录
 * @returns
 */
function getFilePathAndName(name, basePath) {
  let fileName = name || '';
  let filePath = path.join(basePath || 'src');
  const paths = fileName.split('/');
  fileName = paths[paths.length - 1];
  filePath = path.join(filePath, ...paths);
  // filePath = process.platform.startsWith('win') ? // 系统不同，文件夹分割/或者\\
  //   filePath.replace(/\//g, '\\') :
  //   filePath;

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
 * @param {string} basePath 基础路径。默认为src目录
 * @returns
 */
function getPathAndName(name, basePath) {
  let fileName = name || '';
  let filePath = basePath || 'src';
  const paths = name.split('/');
  fileName = paths.splice(-1);
  filePath = path.join(filePath, ...paths);

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
  getFilePathAndName,
  firstUpperCase,
  getPathAndName,
  spinner,
}