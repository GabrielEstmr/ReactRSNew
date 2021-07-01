import { Container } from './styles';
import { Summary } from '../Summary/index';
import { TransactionsTable } from '../TransactionsTable/index'


export function Dashboard() {
    return (
        <Container>
            <Summary></Summary>
            <TransactionsTable></TransactionsTable>
        </Container>
    );
};