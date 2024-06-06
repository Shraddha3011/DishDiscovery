// recipe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = 'https://ggl81ic28i.execute-api.ca-central-1.amazonaws.com/dev/recipes';
  private recipeUrl = 'https://ggl81ic28i.execute-api.ca-central-1.amazonaws.com/dev/recipe';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getRecipeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.recipeUrl}/${id}`);
  }
}
