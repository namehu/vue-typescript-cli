import mkdirp from 'mkdirp';
import path from 'path';
import { getFilePathAndName, spinner, fileIsExist, applayTemplate } from './utils';

export default async function generateSimpleComponent(name: string, basePath: string) {
  const { file_name, filePath, filePascalName } = getFilePathAndName(name, basePath);

  spinner.start(`${path.join(filePath, file_name)} is generating......`);

  const source = path.join(__dirname, '../templates/simple-component.tpl');
  const dest = path.join(filePath, `${file_name}.ts`);

  if (fileIsExist(dest)) { return; }

  await mkdirp(filePath);

  applayTemplate(source, dest, { filePascalName });

  spinner.succeed(`Generate ${dest} success`);
}