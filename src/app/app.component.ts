import { Component, OnInit } from '@angular/core';
import { AppTestService } from '../service/app-test.service';
import { HttpCli } from '../app/common/http-cli';

// import * as FileSaver from 'file-saver';

declare let $: any;


class RestorationStatusMst {
  seqNo: string = '';
  baseSeqNo: string = '';
  serviceName: string = '';
  serviceCd: string = '';
  mainOrgName: string = '';
  mainOrgCd: string = '';
  moOrgName: string = '';
  moOrgCd: string = '';
  burstDatetime: string = '';
  restoredDatetime: string = '';
  numberOfApplicants: string = '';
  numberOfVictims: string = '';
  numberOfAffectedUsers: string = '';
  firstUserNoticeAt: string = '';
  lastUserNoticeAt: string = '';
  spWebPostingStartAt: string = '';
  spWebPostingEndAt: string = '';
  spWebPostingKanriNum: string = '';
  supportSiteUrl: string = '';
  nextExpectedDatetime: string = '';
  effectiveFlg: string = '1';
  createdAt: string = '';
  createUserName: string = '';
  updatedAt: string = '';
  updateUserName: string = '';
  lockVersion: string = '';
  remarks: string = '';
  serviceMenu: string = '';
  option: string = '';
}



class RequestData {
  baseSeqNo: string = '';
}



class DelObjParam {
  seqNo: string = '';
  baseSeqNo: string = '';
  effectiveFlg: string = '';
  lockVersion: string = '';
  serviceCd: string = '';
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AppTestService, HttpCli ]
})



export class AppComponent implements OnInit {

  _serviceList = Array<any>();
  data = Array<any>();
  _baseSeqNo = '992';

  constructor(
    private api: AppTestService
  ){}

  ngOnInit() {
    this.getRestorationList();
  }

  private update (flg: boolean, addItem: RestorationStatusMst) {
    let requestBody: RestorationStatusMst = new RestorationStatusMst();
    requestBody.baseSeqNo = this._baseSeqNo;
    //更新
    if(flg === false){
      requestBody = addItem;
      requestBody.effectiveFlg = '1';

      delete requestBody['isEdit'];
      // delete requestBody.updatedAt;
      delete requestBody.mainOrgName;
      delete requestBody.moOrgName;
      delete requestBody.updateUserName;
      delete requestBody['sortNumberOfApplicants'];
      delete requestBody['sortNumberOfVictims'];
      delete requestBody['sortNumberOfAffectedUsers'];
      this.api.setBody(requestBody);
      this.api.save('update', "update",
        success => {
          console.log('api Save >>> Successsss!!');
        },
        err => {
          console.log('api Save >>> Errorrrrrr!!');
        }
      );
    } else {
      //新規
      requestBody = addItem;
      requestBody.effectiveFlg = '1';
      requestBody.baseSeqNo = this._baseSeqNo;
      //新規
      delete requestBody.createdAt;
      delete requestBody.updatedAt;
      delete requestBody.lockVersion;
      delete requestBody.seqNo;
      requestBody.createUserName = 'xxx';
      console.log("ORG.insert");
      console.log(requestBody);
      this.api.setBody(requestBody);
      this.api.save('create', "register",
        (success, flg) => {
          if(flg === "register"){
            console.log('api Save >>> Successsssss!!');
          }
        }
      );
    }
  }

  public delete (deleteItem: RestorationStatusMst) {
    let deleteObj: DelObjParam = new DelObjParam();
    deleteItem.effectiveFlg = '0'; // 削除flg
    deleteObj.baseSeqNo = deleteItem.baseSeqNo;
    deleteObj.effectiveFlg = deleteItem.effectiveFlg;
    deleteObj.lockVersion = deleteItem.lockVersion;
    deleteObj.seqNo = deleteItem.seqNo;
    deleteObj.serviceCd = deleteItem.serviceCd;

    this.api.setBody(deleteObj);
    this.api.delete('delete',
      (success, flg) => {
        if(flg === 'delete'){
          console.log('api Delete Successsssssss!!');
        }
      }
    );
  }

  private getRestorationList (): void {
    const request: RequestData = new RequestData();
    request.baseSeqNo = this._baseSeqNo;
    this.api.setParams(request);

    this.api.getList((successRes: any) => {
      this._serviceList = new Array<RestorationStatusMst>();
      // this.data = [];
      let keys = {burstDatetime: ''};
      if (successRes === null && !Array.isArray(successRes.data)) {
        return;
      }
      
      this._serviceList = this.dcArray(successRes.data);
      this._serviceList.forEach( item => {
        item.burstDatetime = this.cutSecond(item.burstDatetime);
        item.restoredDatetime = this.cutSecond(item.restoredDatetime);
        item.firstUserNoticeAt = this.cutSecond(item.firstUserNoticeAt);
        item.lastUserNoticeAt = this.cutSecond(item.lastUserNoticeAt);
        item.spWebPostingStartAt = this.cutSecond(item.spWebPostingStartAt);
        item.spWebPostingEndAt = this.cutSecond(item.spWebPostingEndAt);
        item.nextExpectedDatetime = this.cutSecond(item.nextExpectedDatetime);
        item.createdAt = this.cutSecond(item.createdAt);
        item.updatedAt = this.cutSecond(item.updatedAt);
      });
      this._serviceList.forEach((data) => {
        data.seqNo = String(data.seqNo);
        data.baseSeqNo = String(data.baseSeqNo);

        data['isEdit'] = false;
      });
      this.data = this.dcArray(this._serviceList);
    });
  }

  public dcArray (arr: any) {
    return $.extend(true, [], arr);
  }

  public fileSave(blob, fileName: string){
    // FileSaver.saveAs(blob, fileName, true);
  }

  public deepClone (obj: any) {
    return $.extend(true, {}, obj);
  }

  public cutSecond (datetime: string) {
    datetime = datetime || '';
    const cutSecondDatetime = datetime.substr(0, 16);
    return cutSecondDatetime;
  }

}
