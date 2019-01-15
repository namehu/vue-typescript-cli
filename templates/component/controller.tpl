import { Vue, Component } from 'vue-property-decorator';
import './{{kebabCaseName}}.scss';

@Component({
  template: require('./{{kebabCaseName}}.html'),
})
export default class {{camelName}} extends Vue {
  
}