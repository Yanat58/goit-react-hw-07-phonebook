import React from 'react';
import { ContactItem } from 'components/ContactItem/ContactItem';
import css from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { selectContactValue, selectFilterValue } from 'redux/selectors';

export const ContactList = () => {
  const items = useSelector(selectContactValue);
  const filter = useSelector(selectFilterValue);

  const filterContactHandler = () => {
    const normalizedFilter = filter.toLowerCase();
    if (!filter) {
      return items;
    }
    items.filter(item => item.name.toLowerCase().includes(normalizedFilter));
  };

  return (
    <>
      <ul className={css.contactList}>
        {filterContactHandler()?.map(({ id, name, phone }) => (
          <li className={css.contactItem} key={id}>
            <ContactItem id={id} name={name} phone={phone} />
          </li>
        ))}
      </ul>
    </>
  );
};
