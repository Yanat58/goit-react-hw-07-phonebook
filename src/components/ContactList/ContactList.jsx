import React from 'react';
import css from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { selectContactValue, selectFilterValue } from 'redux/selectors';
import { ContactItem } from 'components/ContactItem/ContactItem';

export const ContactList = () => {
  const items = useSelector(selectContactValue);
  const filter = useSelector(selectFilterValue);

  const filterContactHandler = () => {
    const normalizedFilter = filter.toLowerCase();
    if (!filter) {
      return items;
    }
    console.log(
      items.filter(item => item.name.toLowerCase().includes(normalizedFilter))
    );
  };
  const filterContact = filterContactHandler();

  return (
    <>
      <ul className={css.contactList}>
        {filterContact.map(item => (
          <li className={css.contactItem} key={item.id}>
            <ContactItem item={item} />
          </li>
        ))}
      </ul>
    </>
  );
};
