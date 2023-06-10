import React, { useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Modal } from 'components/Modal/Modal';
import { Layout } from './Layout/Layout';
import { AppBar } from './AppBar/AppBar';
import { useGetContactsQuery } from 'redux/contact_api';

export const App = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const data = useGetContactsQuery();

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
        {data && <ContactList />}
      </Layout>
    </>
  );
};
