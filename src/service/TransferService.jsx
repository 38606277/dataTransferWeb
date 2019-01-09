/*
* @Author: Rosen
* @Date:   2018-01-31 13:19:15
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-04 22:52:34
*/

import   HttpService  from '../util/HttpService.jsx';

class TransferService{
    // 获取任务列表
    getList(listParam){
      
        return HttpService.post('transfer/sql/getAllTransfer',JSON.stringify(listParam));
    }
    
    // 获取任务详情
    getTransferInfo(JobId){
        return HttpService.post('transfer/sql/toDetail?id='+JobId,null);
    }
     // 保存
    save(Param){
        if(Param.transfer_id=='null'){
            return HttpService.post('transfer/sql/createTransfer',JSON.stringify(Param));
        }else{
            return HttpService.post('transfer/sql/updateTransfer',JSON.stringify(Param));
        }
    }
    //删除一个job
    delTransfer(id){
        return HttpService.post('transfer/sql/deleteTransfer',JSON.stringify({id:id}));
    }
    
}

export default TransferService;