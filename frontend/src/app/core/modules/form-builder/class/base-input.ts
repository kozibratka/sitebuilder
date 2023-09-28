
export abstract class BaseInput {
  label: string;
  helpText: string;
  name: string;
  validators: [] = [];
  abstract adminComponent;
}
