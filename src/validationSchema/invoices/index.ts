import * as yup from 'yup';

export const invoiceValidationSchema = yup.object().shape({
  status: yup.string().required(),
  payment_status: yup.string().required(),
  garage_id: yup.string().nullable(),
  mechanic_id: yup.string().nullable(),
  accountant_id: yup.string().nullable(),
});
