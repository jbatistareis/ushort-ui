import { Component } from '@angular/core';
import { ShortenedUrl } from './shortenedUrl'
import { HttpClient } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ushort-ui';

  public orginalUrl: string = undefined;
  public shortenedUrl: ShortenedUrl = undefined;
  public errorMessage: string = undefined;

  constructor(private httpClient: HttpClient) { }

  closeErrorModal() {
    this.errorMessage = undefined;
  }

  shortenUrl() {
    if (this.orginalUrl) {
      let params = new HttpParams().set('url', this.orginalUrl);
      this.httpClient.get("https://ushort-api.herokuapp.com/api/shorten", { params }).subscribe(
        (response) => this.shortenedUrl = response as ShortenedUrl,
        (error) => {
          this.shortenedUrl = undefined;
          this.errorMessage = error.message;
          console.log(error);
        }
      );
    }
  }

  parseDate(date: string) {
    return moment(date).format('MM/DD/YYYY HH:mm:ss');
  }

}
