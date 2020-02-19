import mkdirp from 'mkdirp';
import path from 'path';
import generateComponent from './generate-component';
import { getDirPathAndName, spinner, dirIsExist, applayTemplate } from './utils';

/**
 * 生成一个完整的app
 *
 * @export
 * @param {string} name
 * @param {string} basePath
 * @returns
 */
export default async function generateApp(name: string, basePath: string) {

  const { filePath } = getDirPathAndName(name, basePath);
  spinner.start(`${filePath} is generating......`);

  // 判断目录是否存在
  if (dirIsExist(filePath)) { return; }

  // 创建文件夹
  await mkdirp(filePath)

  // 生成main文件
  applayTemplate(path.join(__dirname, '../templates/page', 'main.tpl'), path.join(filePath, 'main.ts'));

  // 新建components目录
  const comPath = filePath + '/components';
  await mkdirp(comPath);

  await generateComponent('app', comPath, false); // 生成默认app组件

  spinner.succeed(`generate ${filePath} success`);
}