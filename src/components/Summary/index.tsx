import { useContext } from 'react';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';

// import { TransactionContext } from '../../TransactionContext';
import { useTransactions } from '../../hooks/useTransactions';


import { Container } from './styles';


export function Summary() {

    // const { transactions } = useContext(TransactionContext);
    const { transactions } = useTransactions();

    console.log('Summary', transactions)


    const summary = transactions.reduce((acc, el) => {

        if (el.type === 'deposit') {
            acc.deposits += el.amount;
            acc.total += el.amount;
        } else {
            acc.withdraws += el.amount;
            acc.total -= el.amount;
        }

        return acc;

    }, {
        deposits: 0,
        withdraws: 0,
        total: 0,
    })

    const formatNumberToCurrency = (value: number): string => {
        const valueFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(value);
        return valueFormatted;
    }

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas"></img>
                </header>
                <strong>{formatNumberToCurrency(summary.deposits)}</strong>
            </div>

            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saídas"></img>
                </header>
                <strong>{formatNumberToCurrency(summary.withdraws)}</strong>
            </div>

            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total"></img>
                </header>
                <strong>{formatNumberToCurrency(summary.total)}</strong>
            </div>
        </Container>
    )
}