import Component, { mixins } from 'vue-class-component';
import {{filePascalName}}Service from './{{kebabCaseName}}.service';

@require('./{{kebabCaseName}}.render.html?style=./{{kebabCaseName}}.scss')
@Component({})
export default class {{filePascalName}} extends mixins({{filePascalName}}Service) {

}
