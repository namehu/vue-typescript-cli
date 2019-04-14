import Component, { mixins } from 'vue-class-component';
import {{camelName}}Service from './{{kebabCaseName}}.service';
import './{{kebabCaseName}}.scss';

@Component({
  template: require('./{{kebabCaseName}}.html'),
})
export default class {{camelName}} extends mixins({{camelName}}Service) {

}
