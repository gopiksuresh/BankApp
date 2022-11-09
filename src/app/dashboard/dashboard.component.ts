import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // login user name
  user = "";
  //deposit
  // acno = "";
  // pswd = "";
  // amount = "";
  depositForm=this.fb.group({
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
  })

  //withdraw
  // acno1 = "";
  // pswd1 = "";
  // amount1 = "";
  withdrawForm=this.fb.group({
    amount1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd1:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
  })


  constructor(private fb:FormBuilder,private ds:DataService) { 
    this.user= this.ds.currentUser;
  }

  ngOnInit(): void {
  }

  deposit()
  {
    if(this.depositForm.valid)
    {
    var acno =this.depositForm.value.acno;
    var pswd =this.depositForm.value.pswd;
    var amount=this.depositForm.value.amount;
    const result= this.ds.deposit(acno,pswd,amount);
    if(result)
    {
      alert(`${amount} is credited... balance is ${result}`);
    }
    this.depositForm.value.amount='';
    this.depositForm.value.acno='';
    this.depositForm.value.pswd='';
   }
   else{
    console.log(this.depositForm.get('uname')?.errors);
   }
  }  


  withdraw()
  {
    if(this.withdrawForm.valid)
    {
    var acno =this.withdrawForm.value.acno1;
    var pswd =this.withdrawForm.value.pswd1;
    var amount=this.withdrawForm.value.amount1;
    const result= this.ds.withdraw(acno,pswd,amount);
    if(result)
    {
      alert(`${amount} is debited... balance is ${result}`);
    }
    this.withdrawForm.value.amount1='';
    this.withdrawForm.value.acno1='';
    this.withdrawForm.value.pswd1='';
  }
  else{
    console.log(this.withdrawForm.get('uname')?.errors);
  }

 }
}
