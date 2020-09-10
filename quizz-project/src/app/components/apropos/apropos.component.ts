import { Component, OnInit } from '@angular/core';
import {AllService, TokenPostule, TokenPayload,TokenOffert} from '../../all.service'
import {Router, ActivatedRoute} from '@angular/router'
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.component.html',
  styleUrls: ['./apropos.component.scss']
})
export class AproposComponent {

    current :TokenPostule={
    id_postule: 0,
    id:0,
    id_offre :0,
    datePost: '',
    cv: '',
    lm: '',
}
credentials: TokenPayload
element:TokenOffert
id_offre:any
id:any
title = 'fileUpload';
selectedFile :File=null;
cv;
lm;


  constructor(public all:AllService, private router:Router,private route: ActivatedRoute, private http: HttpClient) { }  
  myFunc(){
    alert("ok");
  }

  onFileSelected(event){
    this.selectedFile =<File>event.target.files[1];
    if (event.target.files.length > 0) {
      const cvfile = event.target.files[0];
      this.cv = cvfile;
      const lmfile = event.target.files[0];
      this.lm = lmfile;
    }
  }



  ngOnInit(){
    this.current.id_offre = +this.route.snapshot.paramMap.get('id_offre');
    let user = this.all.getUserDetails();
    this.current.id = user.id;
  }

  onUpload(){
    const fd=new FormData();
    fd.append('uploads', this.cv);
     fd.append('uploads', this.lm);
    this.http.post<any>('http://localhost:4300/postules/postuler', fd).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

 postuler() {
    this.all.postuler(this.current)
    .pipe(first())
    .subscribe(
      (data)=>{
        this.current = data.postules;
        console.log(this.current)
      },
      err=>{
        console.error(err)
      }
    )
    
    }

}
