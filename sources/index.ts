#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import program from 'commander';
import generateApp from './generate-app';
import generateVue from './generate-vue';
import generateMixin from './generate-mixin';
import generateDirective from './generate-directive';
import generateComponent from './generate-component';
import generateSimpleComponent from './generate-simple-component';

// tslint:disable-next-line:no-var-requires
const { version } = require('../package.json');

/**
 * 根据输入配置生成对应文件路径
 *
 * @returns
 */
function generatePath() {
  // 获取项目根路径，根据packages.json判断
  let pa = path.resolve('./');
  let pack = path.join(pa, 'package.json');
  while (!fs.existsSync(pack)) {
    pa = path.resolve(pa, '../');
    pack = path.join(pa, 'package.json');
  }
  // 判断是否传入basePath
  let basePath = program.basePath;
  basePath = basePath ? (basePath === true ? 'src' : basePath) : 'src';
  basePath = path.join(pa, basePath);
  // 拼接特定路径
  // basePath = path.join(basePath, name);

  // 如果命令执行路径包含basePath.则替换为命令执行路径
  if (process.cwd().indexOf(basePath) !== -1) {
    basePath = process.cwd();
  }
  return basePath;
}

const CREATE_VIEW_DESCRIPTION =
  'create a view directory with typescript';
const CREATE_COMPONENT_DESCRIPTION =
  'create a component directory with typescript';
const CREATE_VUE_DESCRIPTION = 'create a .vue component with typescript';
const CREATE_DIRECTIVE_DESCRIPTION = 'create a directive with typescript';
const CREATE_MIXIN_DESCRIPTON = 'create a mixin with typescript';
const CREATE_SERVICE_DESCRIPTON = 'create a service with typescript';
const CREATE_PAGE_DESCRIPTON = 'create a page with typescript';

program
  .command('vue <name>')
  .description(CREATE_VUE_DESCRIPTION)
  .action((name: string) => {
    try {
      generateVue(name, generatePath());
    } catch (error) {
      console.error(error);
    }
  });

program
  .command('mixin <name>')
  .alias('m')
  .description(CREATE_MIXIN_DESCRIPTON)
  .action(name => {
    try {
      generateMixin(name, generatePath());
    } catch (error) {
      console.error(error);
    }
  });

program
  .command('service <name>')
  .alias('s')
  .description(CREATE_SERVICE_DESCRIPTON)
  .action(name => {
    try {
      generateMixin(name, generatePath(), 'Service');
    } catch (error) {
      console.error(error);
    }
  });

program
  .command('directive <name>')
  .alias('d')
  .description(CREATE_DIRECTIVE_DESCRIPTION)
  .action(name => {
    try {
      generateDirective(name, generatePath());
    } catch (error) {
      console.error(error);
    }
  });

program
  .command('component <component>')
  .alias('c')
  .description(CREATE_COMPONENT_DESCRIPTION)
  .action(name => {
    try {
      const basePath = generatePath();
      program.simple ? generateSimpleComponent(name, basePath) :
        generateComponent(name, basePath, false);
    } catch (error) {
      console.error(error);
    }
  });

program
  .command('view <view>')
  .alias('v')
  .description(CREATE_VIEW_DESCRIPTION)
  .action(component => {
    try {
      generateComponent(component, generatePath(), true);
    } catch (error) {
      console.error(error);
    }
  });


program
  .command('page <name>')
  .alias('p')
  .description(CREATE_PAGE_DESCRIPTON)
  .action(name => {
    try {
      generateApp(name, generatePath());
    } catch (error) {
      console.error(error);
    }
  });









program.on('--help', () => {
  console.log('');
  console.log('Examples:');
  console.log('');
  console.log('  # show usage information');
  console.log('  $  vt --help');
  console.log('');
  console.log('  # show version information');
  console.log('  $  vt --version');
  console.log('');
  console.log(`  # ${CREATE_VIEW_DESCRIPTION}`);
  console.log(`  $  vt view view-name`);
  console.log(`  $  vt v path/to/view-name`);
  console.log('');
  console.log(`  # ${CREATE_COMPONENT_DESCRIPTION}`);
  console.log(`  $  vt component component-name`);
  console.log(`  $  vt c path/to/component-name`);
  console.log('');
  console.log(`  # ${CREATE_VUE_DESCRIPTION}`);
  console.log(`  $  vt vue vue-name`);
  console.log(`  $  vt vue path/to/vue-name`);
  console.log('');
  console.log(`  # ${CREATE_DIRECTIVE_DESCRIPTION}`);
  console.log(`  $  vt directive directive-name`);
  console.log(`  $  vt d path/to/directive-name`);
  console.log('');
  console.log(`  # ${CREATE_MIXIN_DESCRIPTON}`);
  console.log(`  $  vt mixin mixin-name`);
  console.log(`  $  vt m path/to/mixin-name`);
  console.log('');
  console.log(`  # ${CREATE_SERVICE_DESCRIPTON}`);
  console.log(`  $  vt service service-name`);
  console.log(`  $  vt m path/to/service-name`);
  console.log('');
  console.log(`  # ${CREATE_PAGE_DESCRIPTON}`);
  console.log(`  $  vt page page-name`);
  console.log(`  $  vt p path/to/page-name`);
  console.log('');
});

program
  .version(version)
  .option('-B, --basePath [path]', 'set BasePath, default src')
  .option('-s, --simple', 'create a component in single file')
  // .option('-t, --template', 'create a component or view with template property')
  .parse(process.argv);

/**
 * Help
 */
(function help() {
  if (program.args.length < 1) { return program.help(); }
})();
