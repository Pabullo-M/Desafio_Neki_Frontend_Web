import React from 'react';
import { Link } from 'react-router-dom';

const RegisterLink = () => {
  return (
    <Link to="/register" style={{ color: 'blue', textDecoration: 'underline' }}>
      Registre-se
    </Link>
  );
};

export default RegisterLink;