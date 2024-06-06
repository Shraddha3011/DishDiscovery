import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Amplify } from 'aws-amplify';
import { Environment } from '../environment/environment';
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  getCurrentUser,
  fetchAuthSession,
  resetPassword,
  confirmResetPassword,
} from 'aws-amplify/auth';

export interface User {
  name: string;
  email: string;
  password: string;
  code: string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private authenticationSubject: BehaviorSubject<boolean>;

  constructor() {
    Amplify.configure({
      Auth: {
        Cognito: Environment.cognito,
      },
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public resetPassWord(user: User): Promise<any> {
    return resetPassword({
      username: user.email,
    });
  }

  public confirmResetPassword(user: User): Promise<any> {
    return confirmResetPassword({
      username: user.email,
      confirmationCode: user.code,
      newPassword: user.password,
    });
  }

  public signUp(user: User): Promise<any> {
    return signUp({
      username: user.email,
      password: user.password,

      options: {
        userAttributes: {
          name: user.name,
        },
      },
    });
  }

  public confirmSignUp(user: User): Promise<any> {
    return confirmSignUp({
      username: user.email,
      confirmationCode: user.code,
    });
  }

  public signIn(user: User): Promise<any> {
    return signIn({
      username: user.email,
      password: user.password,
    }).then(() => {
      this.authenticationSubject.next(true);
    });
  }

  public signOut(): Promise<any> {
    return signOut().then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public getUser(): Promise<any> {
    return getCurrentUser();
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
        .then((user: any) => {
          if (user) {
            return true;
          } else {
            return false;
          }
        })
        .catch(() => false);
    }
  }

  public getCurrentSession(): Promise<any> {
    return fetchAuthSession();
  }

  public async getJwt() {
    const { idToken } =
      (await fetchAuthSession({ forceRefresh: true })).tokens ?? {};
    return idToken?.toString();
  }
}
