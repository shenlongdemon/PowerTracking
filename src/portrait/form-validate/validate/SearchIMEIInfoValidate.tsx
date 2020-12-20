import * as yup from 'yup';
import {Schema} from 'src/portrait/form-validate/forms/Schema';
import {SearchIMEIInfo} from 'src/models/SearchIMEIInfo';
const SearchIMEIInfoValidate: Schema<SearchIMEIInfo> = {
  imei: {
    placeholder: 'IMEI serial number',
    autoCapitalize: 'characters',
    schema: yup
      .string()
      .min(12, ({min, value}) => `${min - value.length} characters to go`)
      .required('IMEI is Required'),
  },
};
export default SearchIMEIInfoValidate;
