import { useState } from "react";

// Form Validation in here?

// Disable Button Validation in here?

function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
  };

  const handleReset = (evt) => {
    evt.preventDefault();
    setValues(defaultValues);
  };

  return { values, handleChange, setValues, handleReset };
}

export default useForm;
