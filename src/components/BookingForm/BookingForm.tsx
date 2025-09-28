import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';
import css from './BookingForm.module.css';
import * as Yup from 'yup';
import DatePickerComponent from '../DatePicker/DatePicker';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface BookingFormValues {
  name: string;
  email: string;
  message: string;
}

const initialValues: BookingFormValues = {
  name: '',
  email: '',
  message: '',
};

const Schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name is too long')
    .required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  message: Yup.string().min(2, 'Too short!').max(50, 'Wow! it`s too long'),
});

const BookingForm = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const handleSubmit = (values: BookingFormValues, actions: FormikHelpers<BookingFormValues>) => {
    const fullValues = { ...values, bookedFrom: dateRange[0], bookedTo: dateRange[1] };
    console.log('Booked data: ', fullValues);
    actions.resetForm();
    toast.success('Successfully booked!');
  };

  return (
    <div className={css.formWrapper}>
      <h2 className={css.title}>Book your car now</h2>
      <p className={css.text}>Stay connected! We are always ready to help you.</p>

      <Formik initialValues={initialValues} validationSchema={Schema} onSubmit={handleSubmit}>
        <Form>
          <div className={css.form}>
            <Field id="name" type="text" name="name" placeholder="Name*" className={css.input} />
            <ErrorMessage name="name" component="span" className={css.error} />

            <Field
              id="email"
              type="email"
              name="email"
              placeholder="Email*"
              className={css.input}
            />
            <ErrorMessage name="email" component="span" className={css.error} />

            <DatePickerComponent dateRange={dateRange} setDateRange={setDateRange} />

            <Field
              as="textarea"
              name="message"
              id="message"
              rows={3}
              className={css.textarea}
              placeholder="Comment"
            />
            <ErrorMessage name="message" component="span" className={css.error} />
          </div>

          <button className={css.button} type="submit">
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default BookingForm;
