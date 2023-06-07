import PropTypes from 'prop-types';
import { BiUserPlus } from 'react-icons/bi';
import css from './AppBar.module.css';

export const AppBar = ({ onClose }) => {
  return (
    <>
      <h1 className={css.titleAplication}>
        Phone<span className={css.titleColor}>book</span>
      </h1>
      <button type="button" className={css.btnAddContact} onClick={onClose}>
        <BiUserPlus className={css.addModalIcon} size={25} />
      </button>
    </>
  );
};

AppBar.propTypes = {
  onClose: PropTypes.func.isRequired,
};
