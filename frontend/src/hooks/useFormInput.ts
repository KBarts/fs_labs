import { useState, type ChangeEvent } from 'react';

type Validator = (value: string) => string[];

function useFormInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const [messages, setMessages] = useState<string[]>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const validate = (validator: Validator) => {
    const nextMessages = validator(value);
    setMessages(nextMessages);
    return nextMessages;
  };

  const clearMessages = () => setMessages([]);

  const reset = () => {
    setValue(initialValue);
    setMessages([]);
  };

  return {
    value,
    setValue,
    onChange,
    messages,
    setMessages,
    validate,
    clearMessages,
    reset
  };
}

export default useFormInput;