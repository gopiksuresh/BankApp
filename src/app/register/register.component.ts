import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


    uname ="";
    acno ="";
    pswd ="";
    balance: any ="";
    aim='Your perfect banking partner';

    constructor(private ds:DataService, private router:Router) {}   //dependency injection
  

  ngOnInit(): void {
  }

  register(){
    var uname=this.uname;
    var acno=this.acno;
    var pswd=this.pswd;
    const result= this.ds.register(acno,uname,pswd);
    if(result)
    {
      alert('succesfully registered');
      this.router.navigateByUrl('');
    }
    else{
      alert('something went wrong');
    }
    // alert('register button clicked');
  }

}
