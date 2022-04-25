import { Link } from 'react-router-dom';

const TicketItem = ({ ticket }) => {
  return (
    <div className='ticket'>
      {/* https://www.w3schools.com/jsref/jsref_tolocalestring.asp */}
      <div>{new Date(ticket.createdAt).toLocaleString('en-AU')}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  );
};

export default TicketItem;
