import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeService } from 'src/app/service/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-blog',
  templateUrl: './show-blog.component.html',
  styleUrls: ['./show-blog.component.scss']
})
export class ShowBlogComponent implements OnInit {
  recipe: any;
  recipeId: string = '';
  textareaRows = 4;
  textareaCols = 50;
  comments: string = '';
  userComment: string = '';



  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipeId = params['id'];
    })
    this.loadRecipe();
    this.submitComment();
  }


  loadRecipe(): void {
    this.recipeService.getRecipeById(this.recipeId).subscribe((response: any) => {
      console.log('API Response:', response);
      this.recipe = response["Items"]["Item"];

      // Convert ingredients and method to arrays
      this.recipe.recipeIngridents = this.convertToArray(this.recipe.recipeIngridents);
      this.recipe.recipeMethod = this.convertToArray(this.recipe.recipeMethod);
    });
  }

  private convertToArray(data: string | string[]): string[] {
    if (typeof data === 'string') {
      // Split string into array using newline character as delimiter
      return data.split('\n').map(item => item.trim()).filter(item => item !== '');
    } else if (Array.isArray(data)) {
      // If it's already an array, return it as is
      return data;
    } else {
      // If it's neither a string nor an array, return an empty array
      return [];
    }
  }

  submitComment() {
    if (this.userComment.trim() !== '') {
      const commentData = {
        comment: this.userComment,
        id: this.recipeId,
      };
      console.log('Sending commentData:', commentData);
      this.http.post('https://ggl81ic28i.execute-api.ca-central-1.amazonaws.com/dev/recipe/comment', commentData)
        .subscribe({
          next: (response) => {
            console.log('Comment submitted successfully:', response);
            this.recipe.recipeComment.push(this.userComment);
          },
          error: (error) => {
            console.error('Error submitting comment:', error);
            // Log more details if available
            if (error.error instanceof ErrorEvent) {
              console.error('Client-side error:', error.error.message);
            } else {
              console.error('Server-side error:', error.status, error.error);
            }
          }

        });

    }
    this.userComment = '';
  }
}
