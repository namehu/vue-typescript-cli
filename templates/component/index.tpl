import { Vue, Component } from 'vue-property-decorator';

@require('./{{kebabCaseName}}.render.html?style=./{{kebabCaseName}}.scss')
@Component({})
export default class {{camelName}} extends Vue {

}
