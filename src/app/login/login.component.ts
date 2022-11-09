import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { DataService } from '../services/data.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {   //3rd execution
  
  aim='Your perfect banking partner';
  accounts="Enter your Acno here";
  // acno='';
  // pswd='';
  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
  })

  constructor(private fb:FormBuilder, private router:Router,private ds:DataService) { }   // 1st execution

  ngOnInit(): void {     //2nd execution
  }
  userDetails:any={   // objects of objects
    1000:{acno:1000,username:"gopik",password:1000,balance:10000},
    1001:{acno:1001,username:"anagha",password:1001,balance:12000},
    1002:{acno:1002,username:"soja",password:1002,balance:8000}
  }
  

  // acnoChange(event:any){
  //   console.log(event.target.value);
  //   var acno =this.loginForm.value.acno;

  // }
  // pswdChange(event:any){
  //   console.log(event.target.value);
  //   var pswd=this.loginForm.value.pswd;
  // }

  // userdefined functions     :- 4th execution
  login(){
    // alert('login clicked');
    if(this.loginForm.valid)
    {
    var acno=this.loginForm.value.acno;
    var pswd=this.loginForm.value.pswd;
    // var userDetails=this.ds.userDetails;

    // if(acno in userDetails)
    // {
    //   if(pswd==userDetails[acno]['password'])
    
    const result=this.ds.login(acno,pswd);
    if(result)
      {
        alert('login successful');
        this.router.navigateByUrl('dashboard');
      }
    }
    else{
      console.log(this.loginForm.get('uname')?.errors);
    }
    //   else{
    //     alert('incorrect passwrod');
    //   }
    // }
    // else{
    //   alert('user does not exist');
    // }

  }
}


//   login(a:any,p:any){
//     // alert('login clicked');
//     var acno=a.value
//     var pswd=p.value;
//     var userDetails=this.userDetails;

//     if(acno in userDetails)
//     {
//       if(pswd==userDetails[acno]['password'])
//       {
//         alert('login successful');
//       }
//       else{
//         alert('incorrect passwrod');
//       }
//     }
//     else{
//       alert('user does not exist');
//     }

//   }

// }
