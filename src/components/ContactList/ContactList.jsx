import React from 'react';
import { BiUserMinus } from 'react-icons/bi';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContacts } from 'redux/operations';
import { getFilterValue } from 'redux/selectors';
import { getContactValue } from 'redux/selectors';

export const ContactList = () => {
  const contacts = useSelector(getContactValue);
  const filter = useSelector(getFilterValue);
  console.log(contacts);
  const dispatch = useDispatch();
  const deleteContactHandler = id => dispatch(deleteContacts(id));

  const filterContactHandler = () => {
    const normalizedFilter = filter.toLowerCase();
    if (!filter) {
      return contacts;
    }
    return contacts.filter(object =>
      object.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <>
      <ul className={css.contactList}>
        {filterContactHandler().map(({ id, name, number }) => (
          <li className={css.contactItem} key={id}>
            <p className={css.contactName}>{name}:</p>
            <p className={css.contactNumber}>{number}</p>
            <button
              className={css.deletBtn}
              type="button"
              onClick={() => deleteContactHandler(id)}
            >
              <span>
                <BiUserMinus className={css.btnDeleteIcon} size={20} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
