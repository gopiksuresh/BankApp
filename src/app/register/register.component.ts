import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


    // uname ="";
    // acno ="";
    // pswd ="";
    // balance: any ="";
    aim='Your perfect banking partner';
    //register forms
    registerForm=this.fb.group({
      uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
      acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
      pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
    })

    constructor(private fb:FormBuilder, private ds:DataService, private router:Router) {}   //dependency injection
  

  ngOnInit(): void {
  }

  register(){
    console.log(this.registerForm);
    if(this.registerForm.valid){
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
  }
  else{
    console.log(this.registerForm.get('uname')?.errors);
  }
    // alert('register button clicked');
  }

}
