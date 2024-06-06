import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CognitoService } from 'src/app/service/cognito-service.service';
import { ProfileService } from 'src/app/service/profile-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private cognitoService: CognitoService,
    private router: Router,
    private toast: ToastrService,
    private profileService: ProfileService
  ) { }
  ngOnInit(): void {
    window.scrollTo(0, 0);

  }

  logout() {
    this.cognitoService.signOut();
    localStorage.clear();
    this.toast.success('Logged Out Successfully!', 'Success');
    this.router.navigate(['login']);
  }

  navigateToOwnRecipes() {
    this.profileService.getUserRecipes().then((response) => {
      console.log('User recipes:', response);
      this.router.navigate(['own', { recipes: response }]);
    }).catch((error: any) => {
      console.error('Error fetching user recipes:', error);
    });
  }
  

  navigateToSetting() {
    this.router.navigate(['setting']);
  }
  navigateToLikedRecipe() {
    this.router.navigate(['likedrecipe']);
  }
  
}
