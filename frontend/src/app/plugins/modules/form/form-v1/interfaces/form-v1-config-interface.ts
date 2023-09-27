import {BaseInput} from '../../../../../core/modules/form-builder/class/base-input';
import {BasePlugConfigInterface} from '../../../../interfaces/base-plug-config-interface';

export interface FormV1ConfigInterface extends BasePlugConfigInterface  {
  form: Array<Array<BaseInput>>;
}
