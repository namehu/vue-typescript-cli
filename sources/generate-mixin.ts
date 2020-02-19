import mkdirp from 'mkdirp';
import tplApply from 'tpl_apply';
import path from 'path';
import { getFilePathAndName, spinner, fileIsExist } from './utils';

/**
 * 生成vue mixin
 *
 * @export
 * @param {string} name
 * @param {string} basePath
 * @param {string} [suffix='Mixin']
 * @returns
 */
export default async function generateMixin(name: string, basePath: string, suffix: 'Mixin' | 'Service' = 'Mixin') {
  const { file_name, filePascalName, filePath } = getFilePathAndName(name, basePath);
  spinner.start(`${path.join(filePath, file_name)} is generating......`);

  const source = path.join(__dirname, '../templates/mixin.tpl');
  const dest = path.join(filePath, `${file_name}.${suffix === 'Service' ? 'service' : 'mixin'}.ts`);

  if (fileIsExist(dest)) { return; }

  await mkdirp(filePath);

  tplApply.tpl_apply(source, { filePascalName, suffix }, dest);

  spinner.succeed(`Generate ${dest} success`);
}