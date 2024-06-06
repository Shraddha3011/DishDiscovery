import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  enteredSearchValue: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  // onSearchTextChanged() {
  //   this.searchTextChanged.emit(this.enteredSearchValue)
  // }

  searchRecipe(inputElement: HTMLInputElement) {
    this.enteredSearchValue = inputElement.value;
    this.searchTextChanged.emit(this.enteredSearchValue)
  }


}
