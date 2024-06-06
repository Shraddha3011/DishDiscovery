import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HerosectionComponent } from './components/herosection/herosection.component';
import { AboutComponent } from './components/about/about.component';
import { SignupComponent } from './components/signup/signup.component';
import { ConnectComponent } from './components/connect/connect.component';
import { CreateComponent } from './components/create/create.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { CouroselComponent } from './components/courosel/courosel.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { AllBlogsComponent } from './components/all-blogs/all-blogs.component';
import { FooterComponent } from './components/footer/footer.component';
import { RecipeService } from './service/recipe.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShowBlogComponent } from './components/show-blog/show-blog.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadersComponent } from './components/loaders/loaders.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Loader2Component } from './components/loader2/loader2.component';
import { LoginComponent } from './components/login/login.component';
const appRoute: Routes = [
  { path: "", component: HerosectionComponent },
  { path: "about", component: AboutComponent },
  { path: "create", component: CreateComponent },
  // { path: "connect", component: ConnectComponent },
  { path: "signup", component: SignupComponent },
  { path: "search", component: AllBlogsComponent },
  { path: "show-blog/:id", component: ShowBlogComponent },
  { path:"login", component: LoginComponent },

];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HerosectionComponent,
    AboutComponent,
    SignupComponent,
    ConnectComponent,
    SearchComponent,
    AllBlogsComponent,
    FooterComponent,
    ShowBlogComponent,
    LoadersComponent,
    CreateComponent,
    Loader2Component,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, MatButtonModule, MatIconModule, MatTooltipModule,
    RouterModule.forRoot(appRoute), MatCardModule, CouroselComponent, HammerModule,
    FormsModule, HttpClientModule, ToastrModule.forRoot(), BrowserAnimationsModule, MatToolbarModule
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
