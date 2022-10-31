import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {   //3rd execution
  
  aim='Your perfect banking partner';
  accounts="Enter your Acno here";
  acno='';
  pswd='';

  constructor() { }   // 1st execution

  ngOnInit(): void {     //2nd execution
  }
  userDetails:any={   // objects of objects
    1000:{accno:1000,username:"gopik",password:1000,balance:10000},
    1001:{accno:1001,username:"anagha",password:1001,balance:12000},
    1002:{accno:1002,username:"soja",password:1002,balance:8000}
  }

  acnoChange(event:any){
    console.log(event.target.value);
    this.acno=event.target.value;

  }
  pswdChange(event:any){
    console.log(event.target.value);
    this.pswd=event.target.value;
  }

  // userdefined functions     :- 4th execution
  login(){
    // alert('login clicked');
    var acno=this.acno;
    var pswd=this.pswd;
    var userDetails=this.userDetails;

    if(acno in userDetails)
    {
      if(pswd==userDetails[acno]['password'])
      {
        alert('login successful');
      }
      else{
        alert('incorrect passwrod');
      }
    }
    else{
      alert('user does not exist');
    }

  }

}
