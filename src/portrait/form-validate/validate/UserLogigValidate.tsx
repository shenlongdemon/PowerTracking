import * as yup from 'yup';
import {Schema} from 'src/portrait/form-validate/forms/Schema';
import {CONSTANTS} from 'core_app/common';
const UserLoginValidate: Schema<{phone: string; password: string}> = {
  phone: {
    placeholder: 'Phone',
    // keyboardType: 'phone-pad',
    schema: yup
      .string()
      .min(1, ({min}) => `Phone must be at least ${min} characters`)
      // .matches(CONSTANTS.PHONE_REGEX, 'Phone number is not valid')
      .required('Phone number is required'),
  },
  password: {
    placeholder: 'Password',
    secureTextEntry: true,
    schema: yup
      .string()
      .min(1, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  },
};
export default UserLoginValidate;
