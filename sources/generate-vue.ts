import mkdirp from 'mkdirp';
import path from 'path';
import { getFilePathAndName, spinner, fileIsExist, applayTemplate } from './utils';

/**
 * 生成.vue 单文件组件
 *
 * @export
 * @param {string} name
 * @param {string} basePath
 * @returns
 */
export default async function genereateVue(name: string, basePath: string) {
  const { fileName, filePath, filePascalName } = getFilePathAndName(name, basePath);
  spinner.start(`${path.join(filePath, fileName)} is generating......`);

  const source = path.join(__dirname, '../templates/vue.tpl');
  const dest = path.join(filePath, `${filePascalName}.vue`);

  if (fileIsExist(dest)) { return; }

  await mkdirp(filePath);

  applayTemplate(source, dest, { filePascalName });

  const message = path.join(filePath, `${filePascalName}.vue`);
  spinner.succeed(`Generate ${message} success`);
}
