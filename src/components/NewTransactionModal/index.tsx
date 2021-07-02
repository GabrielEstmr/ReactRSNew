import { useContext, useState, FormEvent } from 'react';
import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
// import { api } from '../../services/api';

// import { TransactionContext } from '../../TransactionContext';
import { useTransactions } from '../../hooks/useTransactions';


interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}


export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {

    // const { createTransaction } = useContext(TransactionContext);
    const { createTransaction } = useTransactions();

    const [type, setType] = useState('deposit');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [value, setValue] = useState(0);

    async function handleCreateNewTransaction(event: FormEvent) {
        //quando da submit em form=> recarrega toda a página (tente enviar pra outra página) => tira isso
        event.preventDefault();

        await createTransaction({
            title: title,
            amount: value,
            category: category,
            type: type,
        });

        //Mesmo que a modal feiche fica ultimo valores: retirando
        setType('deposit');
        setTitle('');
        setCategory('');
        setValue(0);

        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName={'react-modal-overlay'}
            className={'react-modal-content'}
        >
            <button type={'button'}>
                <img
                    src={closeImg}
                    alt={'Fechar Modal'}
                    onClick={onRequestClose}
                    className={'react-modal-close'} />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>
                <input placeholder={'Título'} value={title} onChange={event => setTitle(event.target.value)}></input>
                <input placeholder={'Valor'} type="number" value={value} onChange={event => setValue(Number(event.target.value))}></input>
                <TransactionTypeContainer>
                    <RadioBox
                        type={'button'}
                        isActive={type === 'deposit'}//função booleana ai vai pra props
                        activeColor="green"
                        onClick={() => { setType('deposit') }}>
                        <img src={incomeImg} alt={'Entrada'} />Entrada
                    </RadioBox>
                    <RadioBox
                        type={'button'}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                        onClick={() => { setType('withdraw') }}>
                        <img src={outcomeImg} alt={'Saída'} />Saída
                    </RadioBox>
                </TransactionTypeContainer>
                <input placeholder={'Categoria'} value={category} onChange={event => setCategory(event.target.value)}></input>
                <button type='submit'>Cadastrar</button>
            </Container>

        </Modal>
    )
}