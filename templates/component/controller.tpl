import { Vue, Component } from 'vue-property-decorator';
import './{{name}}.scss';

@Component({
  template: require('./{{name}}.html'),
})
export default class {{camelName}} extends Vue {
  
}