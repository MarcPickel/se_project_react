import { useState } from "react";

function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

export default useForm;
