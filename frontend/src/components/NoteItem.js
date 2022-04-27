import React from 'react';
import { useSelector } from 'react-redux';

const NoteItem = ({ note }) => {
  const { user } = useSelector((state) => state.auth);

  return <div></div>;
};

export default NoteItem;
