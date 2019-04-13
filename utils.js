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

  name = fisrtLowerCase(name);
  let kebabName = camelCaseToKebabCase(name);
  const paths = kebabName.split('/');

  const file_name = paths[paths.length - 1];
  fileName = kebabCaseToCamelCase(file_name);
  fileName = dotToCamelCase(fileName);

  filePath = path.resolve(pathName, ...paths);

  return {
    file_name,
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

  name = fisrtLowerCase(name);
  let kebabName = camelCaseToKebabCase(name);
  const paths = kebabName.split('/');

  const file_name = paths.splice(-1)[0];
  fileName = kebabCaseToCamelCase(file_name);
  fileName = dotToCamelCase(fileName);

  filePath = path.resolve(pathName, ...paths);

  return {
    file_name, // 横杠命名
    fileName, // 驼峰命名
    filePath, // 路径
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

/**
 * 将名字首字母小写
 *
 * @param {*} name
 * @returns
 */
function fisrtLowerCase(name) {
  let firstLetter = name.slice(0, 1) || '';
  let other = name.slice(1);
  return String(firstLetter).toLowerCase() + other;
}


/**
 * 驼峰转横杠写法
 *
 * @param {*} text
 * @returns
 */
function camelCaseToKebabCase(text) {
  let t = text || '';
  t = t.replace(/([A-Z])(\w)/g, (match, p1, p2) => `-${p1.toLowerCase()}${p2}`);
  t = t.replace(/_/gm, (match, p1) => '-');
  return t;
}

/**
 * 横杠转驼峰写法
 *
 * @param {*} text
 * @returns
 */
function kebabCaseToCamelCase(text) {
  let t = text || '';
  t = t.replace(/[-_](\w)/g, (match, p1) => p1.toUpperCase());
  return t;
}

/**
 * 点命名转驼峰
 *
 * @param {*} text
 * @returns
 */
function dotToCamelCase(text) {
  let t = text || '';
  t = t.replace(/\.(\w)/g, (match, p1) => p1.toUpperCase());
  return t;
}

module.exports = {
  getDirPathAndName,
  firstUpperCase,
  getFilePathAndName,
  spinner,
}