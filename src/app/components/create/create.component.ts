import { Component, OnInit } from '@angular/core';
import { CreateRecipeService } from 'src/app/service/create-recipe.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SaveRecipeService } from 'src/app/service/save-recipe.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  recipes: any;
  searchText: string = '';
  rawTags: string = '';
  selectedFile: any;
  isLoading: boolean = false; // Added loader property

  recipe: any = {
    recipeTitle: '',
    recipeDesc: '',
    recipeIngridents: '',
    recipeMethod: '',
    recipeCookingTime: '',
    recipeImageUrl: '',
    likeCount: 0,
    recipeComment: [],
    tags: [''],
  };

  constructor(
    private recipeService: CreateRecipeService,
    private router: Router,
    private http: HttpClient,
    private saveRecipe: SaveRecipeService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getRecipes().subscribe((response: any) => {
      this.recipes = response['Items'].Items;
    });
  }

  goToPage(pageName: string, recipeId: string): void {
    this.router.navigate([`${pageName}`, `${recipeId}`]);
  }

  redirectTo(page: string): void {
    this.router.navigate([`${page}`]);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);
    if (file) {
      this.selectedFile = file;
    }
  }

  createRecipe(): void {
    this.isLoading = true; // Set loading to true before making the API call
    this.convertToBase64(this.selectedFile);
  }

  convertToBase64(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String: string | ArrayBuffer | null = reader.result;
      if (typeof base64String === 'string') {
        console.log('Base64 image:', base64String);
        this.recipe.recipeImageUrl = base64String;
        this.recipe.tags = this.rawTags.split(' ');

        // Send base64 image to Lambda function
        this.saveRecipe
          .invokeLambdaFunction(this.recipe)
          .then((response) => {
            console.log('Lambda function invoked successfully:', response);
            this.toastService.success('Recipe Successfully Saved!', 'Success', {
              timeOut: 5000,
            });
            this.router.navigate(['/search']);
            // Handle Lambda function response as needed
          })
          .catch((err) => {
            this.toastService.error('Something went wrong', 'Error');
          })
          .finally(() => {
            this.isLoading = false; // Set loading to false after API call is complete
          });
      }
    };
    reader.readAsDataURL(file);
  }
}
