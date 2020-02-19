import mkdirp from 'mkdirp';
import path from 'path';
import { getDirPathAndName, spinner, dirIsExist, applayTemplate } from './utils';

/**
 * 生成component组件
 *
 * @export
 * @param {string} name
 * @param {string} basePath
 * @param {boolean} [isView=false]
 * @returns
 */
export default async function generateComponent(name: string, basePath: string, isView: boolean = false) {
  const { file_name, filePascalName, filePath } = getDirPathAndName(name, basePath);
  spinner.start(`${filePath} is generating......`);

  if (dirIsExist(filePath)) { return; }


  // 创建文件夹
  await mkdirp(filePath)

  const data = { kebabCaseName: file_name, filePascalName };

  const tplPath = path.join(__dirname, '../templates/component');
  let tpls = [];
  if (isView) {
    tpls = [
      { source: 'scss.tpl', dest: `${file_name}.scss` },
      { source: 'html.tpl', dest: `${file_name}.render.html` },
      { source: 'index-with-service.tpl', dest: 'index.ts' },
      { source: 'service.tpl', dest: `${file_name}.service.ts` },
    ];

  } else {
    tpls = [
      { source: 'scss.tpl', dest: `${file_name}.scss` },
      { source: 'html.tpl', dest: `${file_name}.render.html` },
      { source: 'index.tpl', dest: 'index.ts' },
    ];
  }

  // const tpls = fs.readdirSync(tplPath);
  tpls.forEach(({ source, dest }) => {
    applayTemplate(
      path.join(tplPath, source),
      path.join(filePath, dest),
      data,
    );

  });

  // 如果是view的话。需要额外的生成一个组件文件夹
  if (isView) {
    await mkdirp(path.join(filePath, 'components'));
  }

  spinner.succeed(`generate ${filePath} success`);
}