import React, { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Modal } from 'components/Modal/Modal';
import { Layout } from './Layout/Layout';
import { AppBar } from './AppBar/AppBar';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from './Message/Message';
import { selectContactValue, selectError, selectIsLoading } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';

export const App = () => {
  const [showModal, setShowModal] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

 const items = useSelector(selectContactValue);
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(fetchContacts())
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
        {items.length===0 ?<Message/> :
       ( <>
         <Filter />
         {isLoading && !error && <b>Request in progress...</b> }
        <ContactList />
        </>)
        }
       
      </Layout>
    </>
  );
};
