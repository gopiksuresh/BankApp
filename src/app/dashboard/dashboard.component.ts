import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // login user name
  user = "";
  acno = '';

  //Date and Time
  systemDate: any

  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '');
    this.systemDate = new Date();
  }
  ngOnInit(): void {

    //Avoid login without username and password

    if (!localStorage.getItem('currentAcno')) {
      alert('Please login')
      this.router.navigateByUrl('')
    }
  }
  depositForm = this.fb.group({
    //deposit
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })
  withdrawForm = this.fb.group({
    //withdraw
    acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount1: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })
  deposit() {
    if (this.depositForm.valid) {
      var acno = this.depositForm.value.acno;
      var pswd = this.depositForm.value.pswd;
      var amount = this.depositForm.value.amount;

      const result = this.ds.deposit(acno, pswd, amount)
        .subscribe((result: any) => {
          alert(result.message);
        },
          (result: any) => {
            alert(result.error.message)
          })

    }
  }

  withdraw() {
    if (this.withdrawForm.valid) {
      var acno = this.withdrawForm.value.acno1;
      var pswd = this.withdrawForm.value.pswd1;
      var amount = this.withdrawForm.value.amount1;
      const result = this.ds.withdraw(acno, pswd, amount)
        .subscribe((result: any) => {
          alert(result.message);
        },
          (result: any) => {
            alert(result.error.message)
          })
    }
  }

  logout() {
    localStorage.removeItem('currentAcno');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }
  delete() {
    this.acno = JSON.parse(localStorage.getItem('currentAcno') || '')
  }
  onCancel() {
    this.acno = '';
  }
  
}
