/*
* @Author: Rosen
* @Date:   2018-01-31 13:19:15
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-04 22:52:34
*/

import   HttpService  from '../util/HttpService.jsx';

class FndvarService{
    // 获取任务列表
    getList(listParam){
      
        return HttpService.post('transfer/globalVar/getAllFndVar',JSON.stringify(listParam));
    }
    
    // 获取任务详情
    getFndvarInfo(Id){
        return HttpService.post('transfer/globalVar/getFndVarByName',JSON.stringify({var_name:Id}));
    }
     // 保存
    save(Param,action){
        if(action=='Create'){
            return HttpService.post('transfer/globalVar/createFndVar',JSON.stringify(Param));
        }else{
            return HttpService.post('transfer/globalVar/updateFndVar',JSON.stringify(Param));
        }
    }
    //删除一个job
    delFndvar(id){
        return HttpService.post('transfer/globalVar/deleteFndVar',JSON.stringify({var_name:id}));
    }
    
}

export default FndvarService;