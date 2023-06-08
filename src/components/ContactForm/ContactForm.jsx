import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { BiUserPlus } from 'react-icons/bi';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContactValue } from 'redux/selectors';

export const ContactForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const items = useSelector(getContactValue);

  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');

  const addContactHandler = () => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const nameIsExist = items.some(
      item => item.name.toLowerCase().trim() === name.toLowerCase().trim()
    );

    const numberIsExist = items.some(
      item => item.number.trim() === number.trim()
    );

    if (name.trim() === '' || number.trim() === '') {
      Notiflix.Notify.warning(`Fields must be filled`);
      return;
    } else if (nameIsExist) {
      Notiflix.Report.warning(`This ${name} is already in contacts`);
    } else if (numberIsExist) {
      Notiflix.Report.warning(`This ${number} is already in contacts`);
    } else {
      dispatch(addContact(newContact));
      console.log(dispatch(addContact(newContact)));
    }

    onClose();
    setName('');
    setNumber('');
  };

  return (
    <form className={css.formBox} onSubmit={e => e.preventDefault()}>
      <label className={css.label}>
        <b className={css.labelText}>Name</b>
        <input
          className={css.input}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Enter name"
          onChange={e => setName(e.currentTarget.value)}
        />
      </label>
      <label className={css.label}>
        <b className={css.labelText}>Number</b>
        <input
          className={css.input}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Enter phone number"
          onChange={e => setNumber(e.currentTarget.value)}
        />
      </label>

      <button
        className={css.btnAdd}
        type="submit"
        onClick={() => addContactHandler()}
      >
        <BiUserPlus className={css.btnAddIcon} size={25} />
        <span className={css.btnAddText}>Add contact</span>
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};
