import { Form, Formik } from 'formik';
import React from 'react';

function FormikWrapper({ formInitials, formSchema, submitFunc, formikRef, children }) {
  return (
    <Formik
      enableReinitialize
      innerRef={formikRef}
      initialValues={formInitials}
      validationSchema={formSchema}
      onSubmit={async (values, actions) => {
        await submitFunc(values, actions);
      }}
    >
      {() => (
        <Form>
          {children}
        </Form>
      )}
    </Formik>
  );
}

export default FormikWrapper;
