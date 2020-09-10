import { BrowserModule } from '@angular/platform-browser'
import { NgModule, Pipe, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {AllService} from './all.service'
import  {AuthGuardService} from './auth-guard.service'
import { Routes, RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component'
import { AboutComponent } from './components/about/about.component'
import { BlogComponent } from './components/blog/blog.component'
import { ContactComponent } from './components/contact/contact.component'
import { PortfolioComponent } from './components/portfolio/portfolio.component'
import { FeedbackComponent } from './components/feedback/feedback.component'
import { FooterComponent } from './components/footer/footer.component'
import { QuizComponent } from './components/quiz/quiz.component'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { FormoffreComponent } from './components/formoffre/formoffre.component'
import { FormspontaneesComponent } from './components/formspontanees/formspontanees.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RecruteurComponent } from './components/recruteur/recruteur.component'
import{MatButtonModule}from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatSelectModule} from '@angular/material/select'
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card'
import {MatToolbarModule} from '@angular/material/toolbar'
import {CommonModule} from '@angular/common'
import {MatDialogModule} from '@angular/material/dialog'
import {MatTableModule} from '@angular/material/table'
import {MatMenuModule, MatMenu} from '@angular/material/menu'
import {MatIconModule} from '@angular/material/icon'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { from } from 'rxjs'
import { MatListModule} from  '@angular/material/list'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatRadioModule } from '@angular/material/radio'
import { AuthentificationComponent } from './components/authentification/authentification.component'
import {FlexLayoutModule} from '@angular/flex-layout'
import { InscriptionComponent } from './components/inscription/inscription.component'
import { ValidateEqualModule } from 'ng-validate-equal'
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatDividerModule} from '@angular/material/divider'; 
import {MatGridListModule} from '@angular/material/grid-list';
import { ListeComponent } from './components/liste/liste.component';
import { OffreComponent } from './components/offre/offre.component';
import { AffichageComponent } from './components/affichage/affichage.component';
import { CandidatComponent } from './components/candidat/candidat.component';
import { HeaderComponent } from './components/header/header.component';
import { CompteRecruteurComponent } from './compte-recruteur/compte-recruteur.component';
import { AproposComponent } from './components/apropos/apropos.component';
import {FileUploadModule} from 'ng2-file-upload';

const routes: Routes = [


  
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'quiz',
    component: QuizComponent
  },
  { path: 'recruteur/new', component: RecruteurComponent, canActivate : [AuthGuardService]},
  { path: 'formoffre/new', component: FormoffreComponent },
  { path: 'formspontanees/new', component: FormspontaneesComponent },
  { path: 'authentification/new', component: AuthentificationComponent},
  {path: 'inscription/new', component:InscriptionComponent},
  {path: 'offre/new', component:OffreComponent},
  {path: 'liste/new', component: ListeComponent},
  {path: 'affichage/:id_offre', component:AffichageComponent},
  {path: 'candidat/:id_offre', component:CandidatComponent},
  {path: 'apropos/:id_offre', component: AproposComponent},
  {path: 'about/new', component: AboutComponent},
  {
    path: '**',
    component: HomeComponent
  },
 

];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    BlogComponent,
    ContactComponent,
    PortfolioComponent,
    FeedbackComponent,
    FooterComponent,
    QuizComponent,
    QuizComponent,
    RecruteurComponent,
    AuthentificationComponent,
    InscriptionComponent,
    ListeComponent,
    OffreComponent,
    AffichageComponent,
    CandidatComponent,
    HeaderComponent,
    CompteRecruteurComponent,
    AproposComponent,   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatListModule,
    FlexLayoutModule,
    ValidateEqualModule,
    CdkScrollableModule,
    MatNativeDateModule,
    MatSidenavModule ,
    MatDividerModule,
    MatGridListModule,
    FileUploadModule,

  ],
  
  providers: [HttpClient,
              AllService,
              AuthGuardService,
            ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

})
export class AppModule {}
