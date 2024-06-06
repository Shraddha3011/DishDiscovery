import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderServiceService {
  private loadingCount = 0;

  get isLoading(): boolean {
    console.log(this.loadingCount)
    return this.loadingCount > 0;
  }

  showLoader(): void {
    this.loadingCount++;
  }

  hideLoader(): void {
    console.log(this.loadingCount)
    this.loadingCount--;
    if (this.loadingCount < 2) {
      this.loadingCount = 0;
    }
  }
}