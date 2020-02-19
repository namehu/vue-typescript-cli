import mkdirp from 'mkdirp';
import tplApply from 'tpl_apply';
import path from 'path';
import { getFilePathAndName, spinner, fileIsExist } from './utils';

export default async function generateSimpleComponent(name: string, basePath: string) {
  const { file_name, filePath, filePascalName } = getFilePathAndName(name, basePath);

  spinner.start(`${path.join(filePath, file_name)} is generating......`);

  const source = path.join(__dirname, '../templates/simple-component.tpl');
  const dest = path.join(filePath, `${file_name}.ts`);

  if (fileIsExist(dest)) { return; }

  await mkdirp(filePath);

  tplApply.tpl_apply(source, { filePascalName }, dest);

  spinner.succeed(`Generate ${dest} success`);
}