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

  balance: any = "";
  aim = 'Your perfect banking partner';
  //register forms
  registerForm = this.fb.group({
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private fb: FormBuilder, private ds: DataService, private router: Router) { }   //dependency injection


  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.valid) {
      var uname = this.registerForm.value.uname;
      var acno = this.registerForm.value.acno;
      var pswd = this.registerForm.value.pswd;
      const result = this.ds.register(acno, pswd, uname)
        .subscribe((result: any) => {
          alert(result.message);
          this.router.navigateByUrl('');
        },
        (result:any)=>{
          alert(result.error.message);
        })
    }
  }
}
