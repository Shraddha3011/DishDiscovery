import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/service/recipe.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-herosection',
  templateUrl: './herosection.component.html',
  styleUrls: ['./herosection.component.scss']
})
export class HerosectionComponent {
  images = [
    {
      imgSrc: 'https://images.unsplash.com/photo-1486485764572-92b96f21882a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMGJsb2d8ZW58MHx8MHx8fDA%3D',
      imgAlt: 'image',
    },
    {
      imgSrc: 'https://images.pexels.com/photos/19808760/pexels-photo-19808760/free-photo-of-pizza-with-egg-benedict-and-arugula.jpeg?auto=compress&cs=tinysrgb&w=600',
      imgAlt: 'image2',
    },
    {
      imgSrc: 'https://images.pexels.com/photos/19786212/pexels-photo-19786212/free-photo-of-table-full-of-fast-food-and-beer.jpeg?auto=compress&cs=tinysrgb&w=600',
      imgAlt: 'image3',
    },
    {
      imgSrc: 'https://images.pexels.com/photos/3928854/pexels-photo-3928854.png?auto=compress&cs=tinysrgb&w=600',
      imgAlt: 'image4',
    },
    {
      imgSrc: 'https://images.pexels.com/photos/3763824/pexels-photo-3763824.jpeg?auto=compress&cs=tinysrgb&w=600',
      imgAlt: 'image5',
    },
    {
      imgSrc: 'https://images.pexels.com/photos/3763826/pexels-photo-3763826.jpeg?auto=compress&cs=tinysrgb&w=600',
      imgAlt: 'image5',
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imgAlt: 'image6',
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1619592982310-7b7d51e4207f?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imgAlt: 'image7',
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1528198622811-0842b4e50787?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imgAlt: 'image8',
    },
    {
      imgSrc: 'https://images.pexels.com/photos/3843225/pexels-photo-3843225.jpeg?auto=compress&cs=tinysrgb&w=600',
      imgAlt: 'image9',
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZCUyMGJsb2d8ZW58MHx8MHx8fDA%3D',
      imgAlt: 'image10',
    },
  ]


  recipes: any;

  truncateTitle(title: string): string {
    const words = title.split(' ');
    if (words.length > 3) {
      return words.slice(0, 3).join(' ') + '...';
    }
    return title;
  }
  truncateDescription(description: string): string {
    const words = description.split(' ');
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + '...';
    }
    return description;
  }




  constructor(private recipeService: RecipeService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getRecipes().subscribe((response: any) => {
      // console.log('API Response:', response);
      this.recipes = response["Items"].Items;
    });
  }

  searchText: string = "";

  onSearchTextEntered(searhValue: string) {
    this.searchText = searhValue;
    console.log(this.searchText);
  }

  goToPage(pageName: string, recipeId: string): void {
    this.router.navigate([`${pageName}`, `${recipeId}`]);
  }

  redirectTo(page: string) {
    this.router.navigate([`${page}`]);
  }



  onLikeClick(recipe: any): void {
    let currentLikeCount = recipe.likeCount;
    if (!(recipe.isLiked)) {
      recipe.isLiked = !recipe.isLiked;
      let newLikeCount = this.incrementLikeCountOnServer(recipe.id, currentLikeCount, recipe);
      recipe.likeCount = newLikeCount;
    } else {
      recipe.isLiked = !recipe.isLiked;
      let newLikeCount = this.decrementLikeCountOnServer(recipe.id, currentLikeCount, recipe);
      recipe.likeCount = newLikeCount;
    }

  }


  incrementLikeCountOnServer(id: string, currentLikeCount: number, recipe: any): void {
    this.http.post('https://cwwej52r1l.execute-api.ap-south-1.amazonaws.com/dev/recipe/like', { id, currentLikeCount })
      .subscribe((response: any) => {
        console.log('API Response:', response.Id);
        recipe.likeCount = response.LikeCount;
      });
  }
  decrementLikeCountOnServer(id: string, currentLikeCount: number, recipe: any): void {
    this.http.post('https://cwwej52r1l.execute-api.ap-south-1.amazonaws.com/dev/recipe/dislike', { id, currentLikeCount })
      .subscribe((response: any) => {
        console.log('API Response:', response.Id);
        recipe.likeCount = response.LikeCount;
      });
  }

}