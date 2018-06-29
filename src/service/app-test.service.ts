import { Injectable } from '@angular/core';
import { Request, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { HttpCli } from '../app/common/http-cli';
// import { ApiUtilService } from '../app/common/http-status.service'
import { environment } from '../environments/environment'

const envApiUrl: string = environment.apiUrl; // Name

namespace TestApi {
  // TODO: あとで捨てる
  export const API_URL = envApiUrl + '/ncmd-api/api/restorationResponses';
  export const API_DELETE_URL = envApiUrl + '/ncmd-api/api/service/delete';
  export const API_POST = envApiUrl + '/ncmd-api/api/restorationResponses'
}

@Injectable()
export class AppTestService {

  private subject = new Subject<any>();
  public source = this.subject.asObservable();
  private reqParams = {};
  private reqBody = {};

  constructor(
    private http: HttpCli,
    // private apiUtil: ApiUtilService
  ) { }

  public getSubject () {
    return new Subject();
  }

  public setParams (query) {
    const reqData: URLSearchParams = new URLSearchParams();
    Object.keys(query).forEach((key) => {
      reqData.set(key, query[key]);
    });
    this.reqParams = reqData;
  }

  public setNext (data: any) {
    this.subject.next(data);
  }

  public setBody (body) {
    this.reqBody = JSON.stringify(body);
  }

  public getList (successCallback?: (responseJson: any) => void, errorCallback?: (responseJson: any) => void) {
    const apiUrl = TestApi.API_URL;
    const reqOption = new RequestOptions({
      method: 'GET',
      url: apiUrl,
      // url: '/assets/api/v150/restorationGetResponsesData.json',
      params: this.reqParams
    });
    const req = new Request(reqOption);
    this.http.request(req).subscribe((res: Response) => {
      const resData = {
        data: res.json(),
        apiName: name
      }
      if (successCallback != null && resData.data != null) {
        // this.apiUtil.checkCallback(successCallback).callback(resData);
      } else {
        this.subject.next(resData);
      }
    }, (err: Response) => {
      // this.apiUtil.checkDefaultError(err);
      // this.apiUtil.checkCallback(errorCallback).callback(err);
    });
  }

  public save (url: string, flg: string, callback: (responseJson: any, flg: string) => void, callbackError?: (responseJson: any) => void) {
    const apiUrl = TestApi.API_URL + url;
    const reqOptions = new RequestOptions({
      method: 'POST',
      // url: ServiceRestorationApi.API_POST,
      url: apiUrl,
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: this.reqBody
    });
    const requestQuery = new Request(reqOptions);
    this.http.request(requestQuery).subscribe(
      (res: Response) => {
        // this.apiUtil.checkDefaultNoContent(res);
        // this.apiUtil.checkCallback(callback).callback(res.json(), flg);
      }, (err: Response) => {
      //   this.apiUtil.checkDefaultError(err);
      // this.apiUtil.checkCallback(callbackError).callback(err);
    });
  }

  public delete (flg: string, callback?: (responseJson: any, flg: string) => void, callbackError?: (responseJson: any) => void) {
    const apiUrl = TestApi.API_URL + '/update';
    const reqOptions = new RequestOptions({
      method: 'POST',
      url: apiUrl,
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: this.reqBody
    });
    const requestQuery = new Request(reqOptions);
    this.http.request(requestQuery).subscribe(
      (res: Response) => {
        // this.apiUtil.checkCallback(callback).callback(res.json(), flg);
      }, (err: Response) => {
      //   this.apiUtil.checkDefaultError(err);
      // this.apiUtil.checkCallback(callbackError).callback(err);
    });
  }

}
