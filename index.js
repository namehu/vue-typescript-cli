#!/usr/bin/env node

var program = require('commander');
const path = require('path');
const fs = require('fs');
const generateComponent = require('./actions/generate-component');
const generateVue = require('./actions/generate-vue');


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
  basePath = basePath ? basePath === true ? 'src' : basePath : 'src';
  basePath = path.join(pa, basePath);
  // 拼接特定路径
  // basePath = path.join(basePath, name);

  // 如果命令执行路径包含basePath.则替换为命令执行路径
  if (process.cwd().indexOf(basePath) !== -1) {
    basePath = process.cwd();
  }
  return basePath;
}

program
  .option('-B, --basePath [path]', 'Set BasePath, default src');

program
  .command('component [component]')
  .alias('c')
  .description('Create a component directory in the components directory')
  .action((component) => {
    try {
      let basePath = generatePath();
      generateComponent(component, basePath);
    } catch (error) {
      console.error(error);
    }

  })

program
  .command('view [view]')
  .alias('v')
  .description('Create a view directory in the views directory')
  .action((component) => {
    try {
      let basePath = generatePath();
      generateComponent(component, basePath, true);
    } catch (error) {
      console.error(error);
    }
  })

program
  .command('vue [name]')
  .description('Create a .vue component')
  .action((name) => {
    try {
      let basePath = generatePath('/components');
      generateVue(name, basePath);
    } catch (error) {
      console.error(error);
    }
  })

program.parse(process.argv);


/**
 * Help
 */
(function help() {
  if (program.args.length < 1) return program.help();
})()