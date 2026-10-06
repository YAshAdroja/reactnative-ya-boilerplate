import * as yup from 'yup';

export const userValidationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),

  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required'),

  phone: yup
    .string()
    .trim()
    .required('Phone number is required')
    .test('phone-validation', 'Please enter a valid phone number (at least 7 digits)', (value) => {
      if (!value) return false;
      const digits = value.replace(/\D/g, '');
      return digits.length >= 7 && digits.length <= 15;
    }),
});
