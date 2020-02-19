import mkdirp from 'mkdirp';
import path from 'path';
import { getFilePathAndName, spinner, fileIsExist, applayTemplate } from './utils';

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

  applayTemplate(source, dest, { filePascalName, suffix });

  spinner.succeed(`Generate ${dest} success`);
}