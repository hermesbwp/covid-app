import React from "react";
import { Button } from "react-bulma-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "./index.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../utils/api";

function BookForm() {
  const initialValues = { name: "", birthDay: null, date: null };

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const res = await axios.post("/books", values);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
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
                dateFormat="dd/MMM/yy"
                maxDate={new Date()}
                id="birthDay"
                {...field}
                selected={value}
                onChange={(val) => setFieldValue("birthDay", val.getTime())}
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
                dateFormat="dd/MMM/yyyy h:mm aa"
                timeFormat="HH:mm"
                timeIntervals={15}
                showTimeSelect
                minDate={new Date()}
                id="date"
                {...field}
                selected={value}
                onChange={(val) => setFieldValue("date", val.getTime())}
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

/*
<Columns>
          <Columns.Column>
            <Label>Nome:</Label>
            <Control>
              <Field name="name" type="text" />
            </Control>
          </Columns.Column>
          <Columns.Column className="box_date">
            <Label>Data de nascimento:</Label>
            <Control>
              <DatePicker
                type="date"
                selected={startDate}
                className="blue-border"
              />
            </Control>
          </Columns.Column>
        </Columns>

        <Columns>
          <Columns.Column>Agendamento </Columns.Column>
          <Columns.Column className="box_date">
            <Label>Dia de vacinação:</Label>
            <Control>
              <DatePicker showTimeSelect className="blue-border" />
            </Control>
          </Columns.Column>
        </Columns>
*/