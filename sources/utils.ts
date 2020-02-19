import chalk from 'chalk';
import path from 'path';
import ora from 'ora';
import fs from 'fs';
import spinnerStyle from '../spinners.json';

export const spinner = ora({ spinner: spinnerStyle.dots });


/**
 * 判断文件是否存在
 *
 * @export
 * @param {string} filePath 文件名称(可带路径)
 * @returns
 */
export function fileIsExist(filePath: string) {
  let isExist = false;

  try {
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      isExist = true;
    }
  } catch (error) { }

  if (isExist) {
    spinner.fail(chalk.red(`File already exists: Unable to create ${filePath}`));
  }

  return isExist;
}

/**
 * 判断目录是否已存在
 *
 * @export
 * @param {string} dirPath
 * @returns
 */
export function dirIsExist(dirPath: string) {

  let dirExists = false;

  try {
    const stat = fs.statSync(dirPath);
    dirExists = stat.isDirectory();
  } catch (error) { }

  if (dirExists) {
    spinner.fail(chalk.red(`Folder already exists: Unable to create ${dirPath}`));
  }
  return dirExists;
}

/**
 * 获取文件路径以及文件名称
 *
 * @export
 * @param {string} name 组件名 可以包含路径
 * @param {string} pathName 组件路径 可以包含路径
 * @returns
 */
export function getDirPathAndName(name: string, pathName: string) {

  const names = name.split('/').map(v => {
    let t = v.replace(/(_|\.)/g, '-'); // 将_与.命名都改成横杠
    t = t.replace(/-([A-Z])/g, (match, p1) => `-${p1.toLowerCase()}`); // 将横杠后的第一个大写字母小写
    t = t.replace(/^([A-Z])/, (match, p) => `${p.toLowerCase()}`); // 首字符小写
    t = t.replace(/([A-Z])(\w)/g, (match, p1, p2) => `-${p1.toLowerCase()}${p2}`); // 将剩下的驼峰转换成横杠写法
    return t;
  });

  const file_name = names[names.length - 1];
  const fileName = kebabCaseToCamelCase(file_name);
  const filePascalName = firstUpperCase(fileName);
  const filePath = path.resolve(pathName, ...names);

  return {
    file_name,
    fileName,
    filePascalName,
    filePath,
  };
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
export function getFilePathAndName(name: string, pathName: string) {

  const names = name.split('/').map(v => {
    let t = v.replace(/(_|\.)/g, '-'); // 将_与.命名都改成横杠
    t = t.replace(/-([A-Z])/g, (match, p1) => `-${p1.toLowerCase()}`); // 将横杠后的第一个大写字母小写
    t = t.replace(/^([A-Z])/, (match, p) => `${p.toLowerCase()}`); // 首字符小写
    t = t.replace(/([A-Z])(\w)/g, (match, p1, p2) => `-${p1.toLowerCase()}${p2}`); // 将剩下的驼峰转换成横杠写法
    return t;
  });

  const file_name = names.splice(-1)[0];
  const fileName = kebabCaseToCamelCase(file_name);
  const filePascalName = firstUpperCase(fileName);
  const filePath = path.resolve(pathName, ...names);

  return {
    file_name, // 横杠命名
    fileName, // 驼峰命名
    filePascalName, // 首字符大写命名
    filePath, // 路径
  };
}

/**
 * 将文件首字母大写
 *
 * @export
 * @param {string} name
 * @returns
 */
export function firstUpperCase(name: string) {
  return name.replace(/^([a-z])/, (match, p: string) => `${p.toUpperCase()}`);
}

/**
 * 将名字首字母小写
 *
 * @param {*} name
 * @returns
 */
function fisrtLowerCase(name: string) {
  const firstLetter = name.slice(0, 1) || '';
  const other = name.slice(1);
  return String(firstLetter).toLowerCase() + other;
}


/**
 * 驼峰转横杠写法
 *
 * @param {*} text
 * @returns
 */
function camelCaseToKebabCase(text: string) {
  let t = text || '';
  t = t.replace(/([A-Z])(\w)/g, (match, p1, p2) => `-${p1.toLowerCase()}${p2}`);
  t = t.replace(/_/gm, (match, p1) => '-');
  return t;
}

/**
 * 横杠转驼峰写法
 *
 * @param {string} text
 * @returns
 */
function kebabCaseToCamelCase(text: string = '') {
  return text.replace(/[-_](\w)/g, (match, p) => p.toUpperCase());
}

/**
 * 点命名转驼峰
 *
 * @param {*} text
 * @returns
 */
function dotToCamelCase(text: string) {
  let t = text || '';
  t = t.replace(/\.(\w)/g, (match, p1) => p1.toUpperCase());
  return t;
}
