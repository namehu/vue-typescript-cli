import Component, { mixins } from 'vue-class-component';
import {{camelName}}Service from './{{kebabCaseName}}.service';

@require('./{{kebabCaseName}}.render.html?style=./{{kebabCaseName}}.scss')
@Component({})
export default class {{camelName}} extends mixins({{camelName}}Service) {

}