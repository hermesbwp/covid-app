import React, { useState } from "react";
import { Form, Container } from "react-bulma-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const { Input, Field, Control, Label } = Form;

function BookForm() {
  const [birthDay, setBirthDay] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");

  const onChangeName = ({ target: { value } }) => {
    setName(value);
  };

  return (
    <>
      <Field>
        <Label>Nome {name}</Label>
        <Control>
          <Input name="name" onChange={onChangeName} value={name} />
        </Control>
        <Label>Data de nascimento</Label>
        <Control>
          <DatePicker
            selected={birthDay}
            onChange={(date) => setBirthDay(date)}
          />
        </Control>
      </Field>
      <Field>
        <h2>Agendamento</h2>
        <Label>Dia de vacinação</Label>
        <Control>
          <DatePicker
            showTimeSelect
            onChange={(date) => setDate(date)}
            selected={date}
          />
        </Control>
      </Field>
    </>
  );
}

export default BookForm;
