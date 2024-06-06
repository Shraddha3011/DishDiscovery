

import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/service/recipe.service';
import { Router } from '@angular/router'; // Import ActivatedRoute
import { LoaderService } from 'src/app/service/loader-service.service';
import { ProfileService } from 'src/app/service/profile-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-own-recipe',
  templateUrl: './own-recipe.component.html',
  styleUrls: ['./own-recipe.component.scss']
})
export class OwnRecipeComponent implements OnInit {
  constructor(
    private profileService: ProfileService,
    public loaderService: LoaderService,
    public recipeService: RecipeService,
    private router: Router,
    private toasterService: ToastrService
  ) { }
  recipes: any[] = [];


  truncateTitle(title: string): string {
    const words = title.split(' ');
    if (words.length > 3) {
      return words.slice(0, 3).join(' ') + '...';
    }
    return title;
  }

  truncateDescription(description: string): string {
    const letters = description.length;
    if (letters > 100) {
      return description.slice(0, 100) + '...';
    }
    return description;
  }

  ngOnInit() {
    this.profileService.getUserRecipes().then((response) => {
      console.log('User recipes:', response);
      // this.recipes.pop();
      for (let recipe of response) {
        this.recipes.push(recipe.Item)
      }
      console.log("updated recipes:" + this.recipes[0].recipeId)
    }).catch((error: any) => {
      console.error('Error fetching user recipes:', error);
    });
  }


  navigateToEdit() {
    this.router.navigate(['editrecipe']);

  }


  deleteRecipe(recipeId: any) {
    this.profileService.deleteUserRecipe(recipeId).then(() => {
      this.toasterService.success("Recipe Deleted Successfully", "Success")
    }).catch(() => {
      this.toasterService.error("Error", "ERROR")
    })
  }
  goToPage(pageName: string, recipeId: string): void {
     this.router.navigate([`${pageName}`, `${recipeId}`]);
     }

}