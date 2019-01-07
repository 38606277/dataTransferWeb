/*
* @Author: Rosen
* @Date:   2018-01-31 13:19:15
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-04 22:52:34
*/

import   HttpService  from '../util/HttpService.jsx';

class Job{
    // 获取代办任务列表
    getList(listParam){
      
        return HttpService.post('job/getAllJobInfo',JSON.stringify(listParam));
    }
    //获取已办任务列表
    getJobList(listParam){
      
        return HttpService.post(
           '/reportServer/dataCollect/getMyJobListByUserId',
           JSON.stringify(listParam)
        );
    }
    // 获取任务详情-弃用
    getJobInfo(JobId){
        return HttpService.post('job/toDetail?id='+JobId,null);
    }
     // 获取模板详情进行填报
     save(Param){
        return HttpService.post('job/addJob',JSON.stringify(Param));
    }
     // 查看填报详情
     viewJobTemplate(JobId){
        return HttpService.post(
            '/reportServer/dataCollect/viewHtmlForReact/'+JobId,
            null
        );
    }
}

export default Job;