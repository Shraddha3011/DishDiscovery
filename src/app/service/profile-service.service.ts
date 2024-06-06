
// profile-service.service.ts
import { Injectable } from '@angular/core';
//import { Profile } from './profile.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CognitoService } from './cognito-service.service';
import { Environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  private apiUrl = 'https://ggl81ic28i.execute-api.ca-central-1.amazonaws.com/dev/profile';
  private userPostsUrl = 'https://ggl81ic28i.execute-api.ca-central-1.amazonaws.com/dev/user-posts';
  private apiInProgress = false;
  private userLikedRecipesAPIURL = 'https://ggl81ic28i.execute-api.ca-central-1.amazonaws.com/dev/get-liked-posts';
  private userRecipesAPIURL = 'https://ggl81ic28i.execute-api.ca-central-1.amazonaws.com/dev/get-user-posts';
  private deleteRecipeUrl = "https://ggl81ic28i.execute-api.ca-central-1.amazonaws.com/dev/recipe/delete";
  private usernameUrl = "https://ggl81ic28i.execute-api.ca-central-1.amazonaws.com/dev/get-user";
  private updateRecipeUrl="https://ggl81ic28i.execute-api.ca-central-1.amazonaws.com/dev/recipe";

  //private profile: Profile;

  constructor(private http: HttpClient, private cognitoService: CognitoService) {
    // Retrieve profile data from localStorage on service initialization
    // const storedProfile = localStorage.getItem('profile');
    // this.profile = storedProfile ? JSON.parse(storedProfile) : new Profile('Default Name', 'Default Message');

  }

  setApiInProgress(status: boolean): void {
    this.apiInProgress = status;
  }

  isApiInProgress(): boolean {
    return this.apiInProgress;
  }

  getUserProfile(): Promise<any> {
    this.setApiInProgress(true);
    return this.cognitoService.getJwt().then((token: any) => {
      const header = new HttpHeaders({
        Authorization: token,
        'Content-Type': 'application/json',
      });

      const username = localStorage.getItem(Environment.LOCAL_STORAGE);

      return this.http
        .post<any>(this.apiUrl, { username }, { headers: header })
        .toPromise();
    });
  }

  updateRecipe(recipe: any): Promise<any> {
    this.setApiInProgress(true);
    return this.cognitoService.getJwt().then((token: any) => {
      const header = new HttpHeaders({
        Authorization: token,
        'Content-Type': 'application/json',
      });
  
      const username = localStorage.getItem(Environment.LOCAL_STORAGE);
  
      return this.http
        .put<any>(this.updateRecipeUrl, { username ,recipe}, { headers: header })  
        .toPromise();
    });
  }

  getUserRecipes(): Promise<any> {
    this.setApiInProgress(true);
    return this.cognitoService.getJwt().then((token: any) => {
      const header = new HttpHeaders({
        Authorization: token,
        'Content-Type': 'application/json',
      });

      const username = localStorage.getItem(Environment.LOCAL_STORAGE);

      return this.http
        .post<any>(this.userRecipesAPIURL, { username }, { headers: header })
        .toPromise();
    });
  }

  getUserLikedRecipes(): Promise<any> {
    this.setApiInProgress(true);
    return this.cognitoService.getJwt().then((token: any) => {
      const header = new HttpHeaders({
        Authorization: token,
        'Content-Type': 'application/json',
      });

      const username = localStorage.getItem(Environment.LOCAL_STORAGE);

      return this.http
        .post<any>(this.userLikedRecipesAPIURL, username, { headers: header })
        .toPromise();
    });
  }
  deleteUserRecipe(recipeId: any): Promise<any> {
    this.setApiInProgress(true);
    return this.cognitoService.getJwt().then((token: any) => {
      const header = new HttpHeaders({
        Authorization: token,
        'Content-Type': 'application/json',
      });

      const username = localStorage.getItem(Environment.LOCAL_STORAGE);

      return this.http
        .post<any>(this.deleteRecipeUrl, { username, recipeId }, { headers: header })
        .toPromise();
    });
  }
  getUsername(): Promise<any> {
    this.setApiInProgress(true);
    return this.cognitoService.getJwt().then((token: any) => {
      const header = new HttpHeaders({
        Authorization: token,
        'Content-Type': 'application/json',
      });

      const username = localStorage.getItem(Environment.LOCAL_STORAGE);

      return this.http
        .post<any>(this.usernameUrl, { username }, { headers: header })
        .toPromise();
    });
  }

}
//   addUserPost(post: any): Promise<any> {
//     this.setApiInProgress(true);
//     return this.cognitoService.getJwt().then((token: any) => {
//       const header = new HttpHeaders({
//         Authorization: token,
//         'Content-Type': 'application/json',
//       });

//       const username = localStorage.getItem(Environment.LOCAL_STORAGE);

//       return this.http
//         .post<any>(this.userPostsUrl, { username, post }, { headers: header })
//         .toPromise();
//     });
//   }
// }

// updateUserProfile(name: string, message: string): Promise<any> {
//   this.setApiInProgress(true);
//   return this.cognitoService.getJwt().then((token: any) => {
//     const header = new HttpHeaders({
//       Authorization: token,
//       'Content-Type': 'application/json',
//     });

//     const username = localStorage.getItem(Environment.LOCAL_STORAGE);

//     return this.http
//       .put<any>(this.apiUrl, { username, name, message }, { headers: header })
//       .toPromise();
//   });
// }