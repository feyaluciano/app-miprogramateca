import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'; 


import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { MiNavMenuComponent } from './components/mi-nav-menu/mi-nav-menu.component';
import { DivConImagenYDetalleComponent } from './components/div-con-imagen-y-detalle/div-con-imagen-y-detalle.component';
import { MiModalAutenticacionComponent } from './components/mi-modal-autenticacion/mi-modal-autenticacion.component';
import { ApiService }  from './services/usuarios/api.service';
import { TiposRecursosService }  from './services/tiposrecursos/tipos-recursos.service';

import { ReactiveFormsModule,FormsModule } from '@angular/forms';


import { TipoRecursoComponent } from './components/tipo-recurso/tipo-recurso.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FooterComponent } from './components/footer/footer.component';

import { RouterModule,Routes} from '@angular/router';
import { CompartirComponent } from './components/compartir/compartir.component';
import { AngularckeditorComponent } from './components/angularckeditor/angularckeditor.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular'; 

import { NgxSpinnerModule } from "ngx-spinner";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetalleRecursoComponent } from './components/detalle-recurso/detalle-recurso.component';
import { UrlsMejoradasPipe } from './pipes/urls-mejoradas.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ResumenParrafoPipe } from './pipes/resumen-parrafo.pipe';
import { QueEsMiprogramatecaComponent } from './components/que-es-miprogramateca/que-es-miprogramateca.component';
import { LoginRegistroComponent } from './components/login-registro/login-registro.component';

const rutas:Routes=[
  {
     path:'tiporecurso/:IdTipoRecurso/:NombreTipo',
     component:TipoRecursoComponent
  },
  {
    path:'recurso/:IdRecurso/:TituloRecurso',
    component:DetalleRecursoComponent
 },
 {
  path:'queesmiprogramateca',
  component:QueEsMiprogramatecaComponent
},
  {
    path:'compartir',
    component:CompartirComponent
 },
 {
  path:'ingreso',
  component:LoginRegistroComponent
},
  {
    path:'',
    component:InicioComponent
 }
]


@NgModule({
  declarations: [
    
    AppComponent,
    HeaderComponent,
    MiNavMenuComponent,
    DivConImagenYDetalleComponent,
    MiModalAutenticacionComponent,
    TipoRecursoComponent,
    InicioComponent,
    FooterComponent,
    CompartirComponent,
    AngularckeditorComponent,
    DetalleRecursoComponent,
    UrlsMejoradasPipe,
    SafeHtmlPipe,
    ResumenParrafoPipe,
    QueEsMiprogramatecaComponent,
    LoginRegistroComponent,                  
  ],
  imports: [  
    BrowserAnimationsModule,     
    BrowserModule,
    HttpClientModule,  
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(rutas,{ useHash: true ,onSameUrlNavigation: "reload"}),
    CKEditorModule,
    NgxSpinnerModule
    //imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: ‘reload’})],   
       
    ],
  providers: [ ApiService,TiposRecursosService ],//ACA SE CARGAN LOS SERVICIOS
  bootstrap: [AppComponent]//ES EL COMPONENTE INICIAL QUE SE CARGARA EN EL INDEX, EN EL APP-ROOT
})
export class AppModule { }
