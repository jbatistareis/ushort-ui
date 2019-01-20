import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  public errorMessage: string = undefined;

  private searchUrl: string = undefined;
  private page: any = undefined;
  private pageNumber: number = 0;
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.headers = this.headers.append('Authorization', 'Basic ' + btoa('admin:admin'));
    this.headers = this.headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.getList();
  }

  closeErrorModal() {
    this.errorMessage = undefined;
  }

  getList() {
    let params = new HttpParams().set('page', this.pageNumber.toString()).set('size', '20');
    this.httpClient.get('https://ushort-api.herokuapp.com/api/admin/url', { headers: this.headers, params: params }).subscribe(
      (response) => this.page = response,
      (error) => {
        this.errorMessage = error.message;
        console.log(error);
      }
    );
  }

  findUrl() {
    if (this.searchUrl) {
      let params = new HttpParams().set('query', this.searchUrl);
      this.httpClient.get('https://ushort-api.herokuapp.com/api/admin/url/search', { headers: this.headers, params: params }).subscribe(
        (response) => this.page = response,
        (error) => {
          this.errorMessage = error.message;
          console.log(error);
        }
      );
    } else {
      this.getList();
    }
  }

  removeEntry(url: string) {
    this.httpClient.delete('https://ushort-api.herokuapp.com/api/admin/url/' + url, { headers: this.headers }).subscribe(
      (response) => this.getList(),
      (error) => {
        this.errorMessage = error.message;
        console.log(error);
      }
    );
  }

  previousPage() {
    if (!this.page.first) {
      this.pageNumber--;
      this.getList();
    }
  }

  nextPage() {
    if (!this.page.last) {
      this.pageNumber++;
      this.getList();
    }
  }

  parseDate(date: string) {
    return moment(date).format('MM/DD/YYYY HH:mm:ss');
  }

}
