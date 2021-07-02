import { useState } from 'react';
import { GlobalStyle } from './styles/global';
import { Header } from './components/Header/index'
import { Dashboard } from './components/Dashboard/index';
import Modal from 'react-modal';
import { NewTransactionModal } from './components/NewTransactionModal/index';

import { TransactionsProvider } from './hooks/useTransactions';

Modal.setAppElement('#root');

export function App() {

  //False = default
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModalOpen() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModalOpen() {
    setIsNewTransactionModalOpen(false);
  }

  //<TransactionContext.Provider: fornece a info de TransactionContext para os componentes dentro da tag apenas
  //Global: a tag engloba tudo

  //state => isNewTransactionModalOpen | função handleCloseNewTransactionModalOpen
  // setState => setIsNewTransactionModalOpen => props onRequestClose do componente Header

  //Componente pai: pode passa infos entre filhos
  //O dificil é subir de nível e voltar de novo => contextAPI
  return (
    <>
      <TransactionsProvider>
        <Header onOpenNewTransactionModal={handleOpenNewTransactionModalOpen}></Header>
        <Dashboard></Dashboard>
        <NewTransactionModal
          isOpen={isNewTransactionModalOpen}
          onRequestClose={handleCloseNewTransactionModalOpen}
        ></NewTransactionModal>
        <GlobalStyle />
      </TransactionsProvider>
    </>
  );
}


