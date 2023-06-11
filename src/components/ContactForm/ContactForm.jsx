import React from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import { BiUserPlus } from 'react-icons/bi';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectContactValue } from 'redux/selectors';

export const ContactForm = ({ onClose }) => {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const items = useSelector(selectContactValue);
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    const nameIsExist = items.some(
      item => item.name.toLowerCase().trim() === name.toLowerCase().trim()
    );

    const phoneIsExist = items.some(item => item.phone.trim() === phone.trim());

    if (name.trim() === '' || phone.trim() === '') {
      Notiflix.Notify.warning(`Fields must be filled`);
      onClose();
      setName('');
      setPhone('');
    } else if (nameIsExist) {
      Notiflix.Report.warning(`This ${name} is already in contacts`);
      onClose();
      setName('');
      setPhone('');
    } else if (phoneIsExist) {
      Notiflix.Report.warning(`This ${phone} is already in contacts`);
      onClose();
      setName('');
      setPhone('');
    } else {
      const newContact = {
        name: setName,
        phone: setPhone,
      };
      dispatch(addContact(newContact));

      Notiflix.Notify.success(`Add contact`);
      onClose();
      setName('');
      setPhone('');
    }
  };

  return (
    <form className={css.formBox} onSubmit={e => onSubmit()}>
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
        <b className={css.labelText}>Phone</b>
        <input
          className={css.input}
          type="tel"
          name="phone"
          value={phone}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Enter phone number"
          onChange={e => setPhone(e.currentTarget.value)}
        />
      </label>

      <button className={css.btnAdd} type="submit">
        <BiUserPlus className={css.btnAddIcon} size={25} />
        <span className={css.btnAddText}>Add contact</span>
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};
