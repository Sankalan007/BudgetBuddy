import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import Transaction from 'src/app/model/Transaction';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }
  private userDetailsSetSource = new Subject<boolean>();
  userDetailsSet$ = this.userDetailsSetSource.asObservable();
  private userDetailsSubject = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem('userDetails') as string)
  );
  public userDetailsObservable = this.userDetailsSubject.asObservable();

  setUserDetails(userDetails: any): void {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    this.userDetailsSubject.next(userDetails);
    this.userDetailsSetSource.next(true);
  }

  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  public transactionsObservable = this.transactionsSubject.asObservable();

  setTransaction(transaction: Transaction[]): void {
    this.transactionsSubject.next(transaction);
  }
}
