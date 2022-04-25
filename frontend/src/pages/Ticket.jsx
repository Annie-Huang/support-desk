import { useSelector, useDispatch } from 'react-redux';
import { getTicket, reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Ticket = () => {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );

  const { ticketId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
  }, [isError, message, ticketId]);

  if (isLoading) {
    return <Spinner />;
  }

  // No sure why we only do this in Ticket.jsx but not in Tickets.jsx
  if (isError) {
    return <h3>Something Went Wrong</h3>;
  }

  return <div>Ticket</div>;
};

export default Ticket;
