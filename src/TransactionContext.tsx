import { createContext, useEffect, useState, ReactNode } from 'react';
import { api } from './services/api';

//MUITO IMPORTANTE: conceito da IMUTABILIDADE do REACT
// Não podemos mudar nada de estado via push() ou outro método => tem que usar o SETCONTEXT

// export const TransactionContext = createContext([]);//[] = valor inicial default

//tag term que envolver os componentes

//nos componentes: const data = useContext(TransactionContext);

//IMPORTANTE: sempre que valor do contexto mudar: TODOS OS componentes vão renderizar novamente
// /\ (Acima): igual ESTADO/ props de estilo do componente


interface Transaction {
    id: number;
    title: string;
    type: string;
    category: string;
    amount: number;
    createdAt: string;
}


//OU 
type CreateTransaction2 = Omit<Transaction, 'id' | 'createdAt'>;//Pick => é o contrário
interface CreateTransaction {
    title: string;
    type: string;
    category: string;
    amount: number;
}

// export const TransactionContext = createContext<Transaction[]>([]);//[] = valor inicial default


interface TransactionsContextData {
    transactions: Array<Transaction>;
    createTransaction: (transation: CreateTransaction) => Promise<void>;

}
export const TransactionContext = createContext<TransactionsContextData>({} as TransactionsContextData);//[] = valor inicial default

interface TransactionsProviderProps {
    children: ReactNode;
};
export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // useEffect(() => {
    //     api.get('/transactions')
    //         .then(response => { response.json() })
    //         .then((data) => { console.log(data) })
    // }, []);

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);


    async function createTransaction(transactionInput: CreateTransaction) {
        const response = await api.post('/transactions', { ...transactionInput, creaedAt: new Date() });
        const { transaction } = response.data;

        //Conceito de imutabilidade: copia o que já tem e adiciona o novo
        setTransactions([
            ...transactions,
            transaction,
        ])
        // console.log('Submit', transaction)
    }

    //TransactionContext.Provider fica aqui e pegamos TransactionsProvider no APP tsx
    return (
        <TransactionContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}