import { useSelector } from 'react-redux';
import { useState } from 'react';

const NewTicket = () => {
  const { user } = useSelector((state) => state.auth);
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState('iPhone');
  const [description, setDescription] = useState('');

  return (
    <>
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          {/* label htmlFor need to match input id */}
          <label htmlFor='name'>Customer Name</label>
          <input
            type='text'
            className='form-control'
            id='name'
            value={name}
            disabled
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input
            type='text'
            className='form-control'
            id='email'
            value={email}
            disabled
          />
        </div>
      </section>
    </>
  );
};

export default NewTicket;
