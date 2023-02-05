import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {   //3rd execution

  aim = 'Your perfect banking partner';
  accounts = "Account Number";
 

  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })
  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }   // 1st execution

  ngOnInit(): void {     //2nd execution
  }



  // userdefined functions     :- 4th execution
  login() {
    if (this.loginForm.valid) {
      var acno = this.loginForm.value.acno;
      var pswd = this.loginForm.value.pswd;

      const result = this.ds.login(acno, pswd)
        .subscribe((result: any) => {
          alert(result.message);
          localStorage.setItem('currentAcno', JSON.stringify(result.currentAcno))
          localStorage.setItem('currentUser', JSON.stringify(result.currentUser))
          localStorage.setItem('token', JSON.stringify(result.token))

          this.router.navigateByUrl('dashboard');
        },
          (result: any) => {
            alert(result.error.message)
          })
    }
  }
}