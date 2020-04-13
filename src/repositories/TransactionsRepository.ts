import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.transactions.reduce<Balance>(
      (balance, current) => {
        if (current.type === 'income') {
          return {
            ...balance,
            income: balance.income + current.value,
            total: balance.total + current.value,
          };
        }

        return {
          ...balance,
          outcome: balance.outcome + current.value,
          total: balance.total - current.value,
        };
      },
      { income: 0, outcome: 0, total: 0 },
    );
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
