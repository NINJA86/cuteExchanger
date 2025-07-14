import React, { useState } from 'react';

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const inpObj = {
    onChange: (e) => setValue(e.target.value),
    value,
  };
  return inpObj;
}

export default useInput;
