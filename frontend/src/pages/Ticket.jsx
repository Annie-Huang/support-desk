import { useSelector, useDispatch } from 'react-redux';
import { getTicket, reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useParams } from 'react-router-dom';

const Ticket = () => {
  const { ticket, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );

  const params = useParams();

  return <div>Ticket</div>;
};

export default Ticket;
