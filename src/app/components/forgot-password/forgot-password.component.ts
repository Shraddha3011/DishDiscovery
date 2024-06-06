import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CognitoService, User } from 'src/app/service/cognito-service.service';
import { LoaderService } from 'src/app/service/loader-service.service';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  user: User;
  isConfirmed: boolean;

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private toast: ToastrService,
    private loaderService: LoaderService
  ) {
    this.isConfirmed = false;
    this.user = {} as User;
  }

  resetPassword(): void {
    if (!emailRegex.test(this.user.email)) {
      this.toast.warning('Enter Valid Email', 'Warning');
      return;
    }

    this.cognitoService
      .resetPassWord(this.user)
      .then((data) => {
        this.toast.success('Code sent to \n ' + this.user.email, 'Success');
        this.isConfirmed = true;
      })
      .catch((err) => {
        this.toast.error(err.message, 'Error');
      });
  }

  confirmResetPassword(): void {
    this.cognitoService
      .confirmResetPassword(this.user)
      .then((data) => {
        localStorage.clear();
        this.toast.success('Password Reset Success', 'Success');
        this.router.navigate(['login']);
      })
      .catch((err) => {
        console.log('Error => ' + err);
        this.toast.error(err.message, 'Error');
      });
  }
}
