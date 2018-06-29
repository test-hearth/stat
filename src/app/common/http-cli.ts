import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class HttpCli {

  constructor(
    private http: Http
  ) {}

  get (url, options?) {
    if (!options) {
      options = {};
    }
    if (!options.headers) {
      options.headers = new Headers();
    }
    this.nocacheHeaders(options.headers);
    
    return this.http.get(url, options);
  }
  
  post (url, data, options?) {
    if (!options) {
      options = {};
    }
    if (!options.headers) {
      options.headers = new Headers();
    }
    this.nocacheHeaders(options.headers);
    
    return this.http.post(url, data, options);
  }
  
  request(url, options?) {
    if (!url) {
      url = {};
    }
    if (!url.headers) {
      url.headers = new Headers();
    }
    this.nocacheHeaders(url.headers);
    
    return this.http.request(url, options);
  }

  private nocacheHeaders(headers: Headers) {
    // キャッシュクリアのためのリクエストヘッダーをセット
    headers.append('Cache-Control', 'no-cache');
    headers.append('Pragma', 'no-cache');
    headers.append('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
  }

}
