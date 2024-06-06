import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/service/recipe.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoaderServiceService } from 'src/app/service/loader-service.service';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss']
})
export class AllBlogsComponent implements OnInit {
  recipes: any;

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

  constructor(public loaderService: LoaderServiceService, public recipeService: RecipeService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadRecipes();
    this.loaderService.showLoader();
    this.loadRecipes();
  }

  // loadRecipes(): void {
  //   this.recipeService.getRecipes().subscribe((response: any) => {
  //     this.recipes = response["Items"].Items;
  //   });
  // }

  loadRecipes(): void {
    this.loaderService.showLoader(); // Show loader before making API call
    this.recipeService.getRecipes().subscribe(
      (response: any) => {
        console.log("this is response i want : " + response);
        this.recipes = response["Items"].Items;
      },
      (error) => {
        console.error('Error loading recipes:', error);
      },
      () => {
        // This block is executed when the observable is completed
        this.loaderService.hideLoader(); // Hide loader after API call is complete
      }
    );
  }

  searchText: string = "";

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }

  goToPage(pageName: string, recipeId: string): void {
    this.router.navigate([`${pageName}`, `${recipeId}`]);
  }

  onLikeClick(recipe: any): void {
    let currentLikeCount = recipe.likeCount;
    if (!recipe.isLiked) {
      this.incrementLikeCountOnServer(recipe.id, currentLikeCount, recipe);
    } else {
      this.decrementLikeCountOnServer(recipe.id, currentLikeCount, recipe);
    }
    recipe.isLiked = !recipe.isLiked;
  }

  incrementLikeCountOnServer(id: string, currentLikeCount: number, recipe: any): void {
    this.http.post('https://ggl81ic28i.execute-api.ca-central-1.amazonaws.com/dev/recipe/like', { id, currentLikeCount })
      .subscribe((response: any) => {
        // console.log('API Response:', response.Id);
        recipe.likeCount = response.LikeCount;
      });
  }

  decrementLikeCountOnServer(id: string, currentLikeCount: number, recipe: any): void {
    this.http.post('https://ggl81ic28i.execute-api.ca-central-1.amazonaws.com/dev/recipe/dislike', { id, currentLikeCount })
      .subscribe((response: any) => {
        // console.log('API Response:', response.Id);
        recipe.likeCount = response.LikeCount;
      });
  }

  sortedRecipes() {
    if (this.searchText === '') {
      return this.recipes;
    }

    const exactMatches = [];
    const otherMatches = [];

    for (const recipe of this.recipes) {
      if (
        recipe.recipeTitle.toLowerCase().includes(this.searchText) ||
        recipe.tags.includes(this.searchText)
      ) {
        if (recipe.recipeTitle.toLowerCase() === this.searchText) {
          exactMatches.push(recipe);
        } else {
          otherMatches.push(recipe);
        }
      }
    }

    return exactMatches.concat(otherMatches);
  }
}




