export default interface Transaction {
    id: number;
    userId: number;
    type: string;
    description: string;
    amount: number;
    transactionTime: string;
    transactionDate: string;
    category: string;
}
  