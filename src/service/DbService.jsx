import HttpService from '../util/HttpService.jsx';
export default class DbService {
    // 获取函数列表
    getDbList() {
        let url = "transfer/DBConnection/ListAll";
        let param = {
        };
  
        return HttpService.post(url,param);
    }
    getDb(name){
        let url="transfer/DBConnection/GetByName";
        return HttpService.post(url,name);
    }
    saveDb(dbinfo){
        if(dbinfo._name=='null'){
            let url="transfer/DBConnection/save";
            return HttpService.post(url,JSON.stringify(dbinfo));
        }else{
            let url="transfer/DBConnection/update";
            return HttpService.post(url,JSON.stringify(dbinfo));
        }
    }
    deleteDb(name){
        let url="transfer/DBConnection/Delete";
        return HttpService.post(url,name);
    }
    testDb(dbinfo){
        let url="transfer/DBConnection/test";
        return HttpService.post(url,JSON.stringify(dbinfo));
    }
}
