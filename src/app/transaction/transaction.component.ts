import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  // to hold account number
  acno: any;

  //to hold transaction
  transaction: any;


  constructor(private ds: DataService) {
    // to get the value of acno form data service
    this.acno = JSON.parse(localStorage.getItem('currentAcno') || '');
    const result = this.ds.getTransaction(this.acno)
      .subscribe((result: any) => {
        this.transaction=result.transaction;
      },
        (result: any) => {
          alert(result.error.message)
        })
  }

  ngOnInit(): void {
  }

}
