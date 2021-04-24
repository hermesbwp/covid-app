import React from "react";
import { Button } from "react-bulma-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "./index.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../utils/api";

function BookForm() {
  const initialValues = {
    name: "",
    birthDay: null,
    date: null,
    isRetired: null,
    isVaccinated: false,
  };

  const onSubmit = async (values) => {
    const { name, date, birthDay } = values;
    values.birthDay = getAge(birthDay);
    console.log(values);
    try {
      const res = await axios.post("/book", values);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getAge = (time) => {
    const today = new Date();
    const birthDay = new Date(time);
    const age = today.getUTCFullYear() - birthDay.getUTCFullYear();
    if (birthDay.getMonth < today.getMonth()) {
      return age;
    } else if (birthDay.getMonth() === today.getMonth()) {
      if (birthDay.getDay() < today.getDay()) {
        return age;
      } else return age - 1;
    } else return age - 1;
  };

  function validate(values) {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.birthDay) {
      errors.birthDay = "Required";
    }
    if (!values.date) {
      errors.date = "Required";
    }
    return errors;
  }
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      <Form>
        <label className="label">Nome Completo</label>
        <Field type="text" name="name" className="input"></Field>
        <ErrorMessage name="name" component="div" />
        <label className="label">Data de Nascimento</label>
        <Field name="birthDay">
          {({ form, field }) => {
            const { setFieldValue } = form;
            const { value } = field;
            return (
              <DatePicker
                className="input"
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                id="birthDay"
                {...field}
                selected={value}
                onChange={(val) => setFieldValue("birthDay", val)}
                showMonthDropdown
                showYearDropdown
              />
            );
          }}
        </Field>
        <ErrorMessage name="birthDay" component="div" />
        <label className="label">Data de Vacinação</label>
        <Field name="date" placeHolder="Data de vacinação">
          {({ form, field }) => {
            const { setFieldValue } = form;
            const { value } = field;
            return (
              <DatePicker
                className="input"
                dateFormat="dd/MM/yyyy"
                timeFormat="HH:mm"
                timeIntervals={15}
                showTimeSelect
                minDate={new Date()}
                id="date"
                {...field}
                selected={value}
                onChange={(val) => setFieldValue("date", val)}
              />
            );
          }}
        </Field>
        <ErrorMessage name="date" component="div" />
        <Button type="submit" color="info" className="box-button is-medium">
          Submit
        </Button>
      </Form>
    </Formik>
  );
}

export default BookForm;
