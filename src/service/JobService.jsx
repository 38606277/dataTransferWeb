/*
* @Author: Rosen
* @Date:   2018-01-31 13:19:15
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-04 22:52:34
*/

import   HttpService  from '../util/HttpService.jsx';

class JobService{
    // 获取任务列表
    getList(listParam){
      
        return HttpService.post('transfer/job/getAllJob',JSON.stringify(listParam));
    }
    //获取已经在执行的任务列表
    getJobList(listParam){
        return HttpService.post('transfer/job/getMyJobListByUserId',JSON.stringify(listParam));
    }
    // 获取任务详情
    getJobInfo(JobId){
        return HttpService.post('transfer/job/toDetail?id='+JobId,null);
    }
     // 保存
    save(Param){
        if(Param.id=='null'){
            return HttpService.post('transfer/job/createJob',JSON.stringify(Param));
        }else{
            return HttpService.post('transfer/job/updateJob',JSON.stringify(Param));
        }
    }
    //删除一个job
    delJob(id){
        return HttpService.post('transfer/job/deleteJob',id);
    }
    //立即执行一个QuartzJob
    executeJob(id){
        return HttpService.post('transfer/job/executeJob',id);
    }
    //暂停一个QuartzJob
    pauseJob(id){
        return HttpService.post('transfer/job/pauseJob',id);
    }
    //还原一个QuartzJob
    resumeJob(id){
        return HttpService.post('transfer/job/resumeJob',id);
    }
     
}

export default JobService;