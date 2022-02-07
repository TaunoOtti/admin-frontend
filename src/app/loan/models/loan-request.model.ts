export interface LoanRequest {
  loanApplicationName: string;
  startDate: string;
  loanPeriodInMonths: number;
  customerId: number;
  amount: string;
}
