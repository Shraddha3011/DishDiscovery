import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class SaveRecipeService {

  private lambdaEndpoint =
    ' https://ggl81ic28i.execute-api.ca-central-1.amazonaws.com/dev/recipe '; // Replace with your actual Lambda endpoint

  constructor(private httpClient: HttpClient) {}

  invokeLambdaFunction(recipe: any): Promise<any> {
    // const body = {
    //   base64Image: base64Image,
    //   // Add any other parameters your Lambda function expects
    // };

    return this.httpClient.post(this.lambdaEndpoint, recipe).toPromise();
  }
}
