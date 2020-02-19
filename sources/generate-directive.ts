import mkdirp from 'mkdirp';
import tplApply from 'tpl_apply';
import path from 'path';
import { getFilePathAndName, spinner, fileIsExist } from './utils';

/**
 * 生成指令模板
 *
 * @export
 * @param {string} name
 * @param {string} basePath
 * @returns
 */
export default async function generateDirective(name: string, basePath: string) {

  const { file_name, filePath } = getFilePathAndName(name, basePath);
  spinner.start(`${path.join(filePath, file_name)} is generating......`);

  const source = path.join(__dirname, '../templates/directive.ts');
  const dest = path.join(filePath, `${file_name}.directive.ts`);

  if (fileIsExist(dest)) { return; }

  await mkdirp(filePath)

  tplApply.tpl_apply(source, {}, dest);

  spinner.succeed(`Generate ${dest} success`);
}