#!/usr/bin/env node

var program = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const spinnerstyle = require('./spinners.json');
const generateComponent = require('./actions/generateComponent');
const generateVue = require('./actions/generateVue');


const spinner = ora({
  text: chalk.blue('generate begin'),
  spinner: spinnerstyle.dots
});

program
  .command('component [component]')
  .alias('c')
  .description('Create a component directory in the components directory')
  .action((component) => {
    generateComponent(component, 'src/components');
  })

program
  .command('view [view]')
  .alias('v')
  .description('Create a view directory in the views directory')
  .action((component) => {
    generateComponent(component, 'src/views');
  })

program
  .command('vue [name]')
  .description('generate a .vue component')
  .action((name) => {
    generateVue(name);
  })

program.parse(process.argv);


/**
 * Help
 */
(function help() {
  if (program.args.length < 1) return program.help();
})()