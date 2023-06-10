import React from 'react';
import { BiUserMinus } from 'react-icons/bi';
import css from './ContactList.module.css';
import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from 'redux/contact_api';

export const ContactList = () => {
  const { data: items, error, isLoading } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  // console.log(data);
  // console.log(isLoading);
  // console.log(error)
  // const items = useSelector(selectContactValue);
  // const filter = useSelector(selectFilterValue);
  // console.log(filter);
  // const dispatch = useDispatch();

  // const filterContactHandler = () => {
  //   const normalizedFilter = filter.toLowerCase();
  //   if (!filter) {
  //     return items;
  //   }
  //   return items.filter(item =>
  //     item.name.toLowerCase().includes(normalizedFilter)
  //   );
  // };

  return (
    <>
      <ul className={css.contactList}>
        {!error &&
          !isLoading &&
          items.map(({ id, name, phone }) => (
            <li className={css.contactItem} key={id}>
              <p className={css.contactName}>{name}</p>
              <p className={css.contactNumber}>{phone}</p>
              <button
                className={css.deletBtn}
                type="button"
                onClick={() => deleteContact(id)}
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
