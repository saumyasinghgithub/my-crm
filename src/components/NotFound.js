import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <center>
    <h1 className='mt-5'>404 - Not Found!</h1>
    <Link to="/404.html">
      Go Home
    </Link>
    </center>
  </div>
);

export default NotFound;