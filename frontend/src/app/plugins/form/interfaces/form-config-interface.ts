import {BasePlugConfigInterface} from '../../shared/interfaces/base-plug-config-interface';
import {BaseInput} from '../../../core/modules/form-builder/class/base-input';


export interface FormConfigInterface extends BasePlugConfigInterface  {
  form: Array<Array<BaseInput>>;
  hashId?: string;
}
