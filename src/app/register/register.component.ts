import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


    uname ="";
    acno ="";
    pswd ="";
    balance: any ="";
    aim='Your perfect banking partner';
    //register forms
    registerForm=this.fb.group({
      uname:[''],
      acno:[''],
      pswd:['']
    })

    constructor(private fb:FormBuilder, private ds:DataService, private router:Router) {}   //dependency injection
  

  ngOnInit(): void {
  }

  register(){
    var uname=this.registerForm.value.uname;
    var acno=this.registerForm.value.acno;
    var pswd=this.registerForm.value.pswd;
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
