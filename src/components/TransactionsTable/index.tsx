
import { useContext } from 'react';
import { Container } from './styles';
import { TransactionContext } from '../../TransactionContext';



export function TransactionsTable() {


    const { transactions } = useContext(TransactionContext);

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>


                <tbody>
                    {transactions.map(e => {
                        return (
                            <tr key={e.id}>
                                <td>{e.title}</td>
                                <td className={e.type}>{new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(e.amount)}</td>
                                <td>{e.category}</td>
                                <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(e.createdAt))}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Container>
    )
}