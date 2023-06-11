import React, { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Modal } from 'components/Modal/Modal';
import { Layout } from './Layout/Layout';
import { AppBar } from './AppBar/AppBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { selectError, selectIsLoading } from 'redux/selectors';

export const App = () => {
  const [showModal, setShowModal] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Layout>
        <AppBar onClose={toggleModal} />
        {showModal && (
          <Modal onClose={toggleModal}>
            <ContactForm onClose={toggleModal} />
          </Modal>
        )}
        <Filter />
        {!isLoading && !isError && <ContactList />}
      </Layout>
    </>
  );
};
