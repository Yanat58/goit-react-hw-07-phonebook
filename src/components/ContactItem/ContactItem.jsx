import React from 'react';
import Notiflix from 'notiflix';
import { BiUserMinus } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import css from './ContactItem.module.css';

export const ContactItem = ({ id, name, phone }) => {
  const dispatch = useDispatch();
  const deleteContactHandler = () => {
    dispatch(deleteContact(id));
    Notiflix.Notify.success(`Delete contact`);
  };
  return (
    <>
      <p className={css.contactName}>{name}</p>
      <p className={css.contactNumber}>{phone}</p>
      <button
        className={css.deletBtn}
        type="button"
        onClick={deleteContactHandler}
      >
        <span>
          <BiUserMinus className={css.btnDeleteIcon} size={20} />
        </span>
      </button>
    </>
  );
};
