import {SchemaControl} from 'src/portrait/form-validate/forms/SchemaControl';

export interface Schema<T> {
  [name: string]: SchemaControl;
}
