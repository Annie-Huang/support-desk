import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  return (
    <div>
      <h1>Register</h1>
    </div>
  );
};

export default Register;
