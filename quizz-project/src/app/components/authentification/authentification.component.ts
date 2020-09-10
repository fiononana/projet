import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import {AllService, TokenPayload} from '../../all.service'




@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('require')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? "Email n'est pas valide" :"" ;
  }

  credentials: TokenPayload = {
    id:0,
    firstName:'',
    lastName:'',
    username:'',
    email :'',
    password :'',
    id_role:1,

  }
  
  constructor(public all:AllService, private router:Router) { }
    authentification(){
      this.all.authentification(this.credentials)
      .pipe(first())
      .subscribe(
        (data)=> {
          this.router.navigateByUrl('/recruteur/new')
        },
        err =>{
                console.error(err)
        }
      )
    }
  }

