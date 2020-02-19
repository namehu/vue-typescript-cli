import { Vue, Component } from 'vue-property-decorator';

@require('./{{kebabCaseName}}.render.html?style=./{{kebabCaseName}}.scss')
@Component({
  name: '{{filePascalName}}'
})
export default class {{filePascalName}} extends Vue {

}
