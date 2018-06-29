import { Injectable } from '@angular/core';
import { SweetAlertType } from 'sweetalert2';

// declare var $: any;

@Injectable()
export class ApiUtilService {

  constructor(
    private sweetAlertType: SweetAlertType
  ) { }

  public checkDefaultError (error: any) {
    /*if (!status || status == null) {
      console.info(status);
      return status;
    }*/
    
    let status = '';
    let resData = {title: '', message: ''};
    let title: string = '';
    let message: string = '';

    //errorのJSON形を判断する。
    if(error){
      if(error.status || error.status === 0){
        status = error.status.toString();
      }
      if(error instanceof Object){
        let ret = true;
        try {
           JSON.parse(error._body);
        }catch(e) {
           ret = false;
        }
        if(ret){
          resData = error.json();
        }
      }
    }
    
    if (status === '0') {
      title = resData.title || 'Network Error';
      message = resData.message || 'ネットワークに接続できません。';
    }
    if (status === '400') {
      title = resData.title || 'Network Error';
      message = resData.message || 'システムエラー';
    }
    if (status === '401') {
      title = resData.title || 'Auth Error';
      message = resData.message || '認証エラー';
      if (resData.message === '権限がありません') {
        title = resData.title;
        message = '危機管理DBの利用権限がありません。管理者に権限を付与してもらってください。';
      } else {
        title = resData.title || 'Internal Server Error';
        message = resData.message || 'システムがダウンしています。';
      }
    }
    if (status === '403') {
      title = resData.title || 'Bad Request';
      message = resData.message || 'パラメータが不正です。';
    }
    if (status === '404') {
      title = resData.title || 'Not Found';
      message = resData.message || 'ファイルが見つかりません。';
    }
    if (status === '500') {
      if (resData.title === 'データー更新エラー') {
        title = resData.title;
        message = '当該データは既にほかユーザーによって変更されています。最新の情報を取得し直してください。';
      } else {
        title = resData.title || 'Internal Server Error';
        message = resData.message || 'システムがダウンしています。';
      }
    }
    if (status === '503') {
      title = resData.title || '503';
      message = resData.message || 'サーバーからの応答がありません。<br/>ブラウザの更新をしていただくか管理者までお問い合わせください。';
    }
    this.showMessage(status, message);
    return status;
  }

  public checkDefaultNoContent (response: any, message?: string): boolean {
    message = message || '対象データがありません。';
    if (response.status === 204) {
       this.showMessage(response.status, message);
      return true;
    }
    return false;
  }

  public checkExclusionError (status: number, resData: any) {
    if (resData.title === 'データー更新エラー') {
      this.showMessage(status.toString(), '当該データは既にほかユーザーによって変更されています。最新の情報を取得し直してください。');
    }
    return status;
  }

  public checkArrayNoContent (resData: any): boolean {
    if (resData && Array.isArray(resData) && resData.length > 0) {
      return false;
    }
    return true;
  }

  public checkCallback (callback: any) {
    if (callback != null && typeof callback === 'function') {
      // エラーコールを設定したとき
      return {callback: callback};
    } else {
      // エラーコールがないとき
      return {callback: () => { console.info('コールバック関数がありません。'); }};
    }
  }

  private showMessage (title: string, message: string, callback?: any) {
    // this.sweetAlertType({
    //   title: "<div style='font-size:18px;'>" + title + "<div>",
    //   html: "<div style='font-size:14px;'>" + message + "<div>",
    //   confirmButtonText: '確定',
    //   allowOutsideClick: false,
    //   allowEnterKey: false,
    //   allowEscapeKey: false,
    //   animation: false,
    //   cancelButtonColor: '#7b7b7b',
    //   onBeforeOpen: (e)=>{
    //     var bgColor = $('.right-sidebar .demo-choose-skin li.active :first-child').css("background-color");
    //     $(e).find(".swal2-confirm").css("background-color", bgColor);
    //     $(e).find(".swal2-confirm").css("border-left-color", bgColor);
    //     $(e).find(".swal2-confirm").css("border-right-color", bgColor);
    //     $(e).find(".swal2-styled").css("box-shadow", "none");
    //   }
    // }).then((isConfirm) => {
    //     if(isConfirm.value && callback){
    //       callback();
    //     }
    // });
  }

}
