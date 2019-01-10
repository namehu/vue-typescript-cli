#!/usr/bin/env node

var program = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const path = require('path');
const fs = require('fs');
const generateComponent = require('./actions/generateComponent');
const generateVue = require('./actions/generateVue');
const {
  getDirPathAndName,
  spinner,
} = require('./utils');

/**
 * 根据输入配置生成对应文件路径
 *
 * @param {*} name 输入文件名
 * @returns
 */
function generatePath(name) {
  let pa = path.resolve('./');
  let pack = path.join(pa, 'package.json');
  while (!fs.existsSync(pack)) {
    pa = path.resolve(pa, '../');
    pack = path.join(pa, 'package.json');
  }
  let basePath = program.basePath;
  basePath = basePath ? basePath === true ? 'src' : basePath : 'src';
  basePath = path.join(pa, basePath);
  basePath = path.join(basePath, name);

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
      let basePath = generatePath('/components');
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
      let basePath = generatePath('/views');
      generateComponent(component, basePath);
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