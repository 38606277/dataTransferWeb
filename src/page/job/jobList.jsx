import React        from 'react';
import { Link }             from 'react-router-dom';
import JobService                 from '../../service/JobService.jsx';
import Pagination           from 'antd/lib/pagination';
import {Table,Divider,Button,Card, Tooltip,Input,Modal}  from 'antd';
import  LocalStorge         from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const _job = new JobService();
const Search = Input.Search;

class JobList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            pageNum        : 1,
            perPage        : 10,
            listType        :'list',
            searchKeyword:'',
            dictionaryList:[],
            pageNumd :1,
            searchDictionary:"",
            paramValue:"",
            totald:0,
        };
    }
    componentDidMount(){
         this.loadJobList();
    }
    loadJobList(){
        let listParam = {};
        listParam.pageNum  = this.state.pageNum;
        listParam.perPage  = this.state.perPage;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.keyword    = this.state.searchKeyword;
        }
        _job.getList(listParam).then(response => {
            this.setState({list:response.data.resultRows,total:response.data.resultTotal});
        }, errMsg => {
            this.setState({
                list : []
            });
            // _mm.errorTips(errMsg);
        });
    }
    // 页数发生变化的时候
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadJobList();
        });
    }
    // 数据变化的时候
    onValueChange(e){
        let name    = e.target.name,
            value   = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
     // 搜索
     onSearch(searchKeyword){
        let listType = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            listType:listType,
            pageNum         : 1,
            searchKeyword   : searchKeyword
        }, () => {
            this.loadJobList();
        });
    }
    deleteJob(id,status){
        if(status=='1'){
            alert("正在运行中不能删除！");
            return false;
        }
        if(confirm('确认删除吗？')){
            _job.delJob(id).then(response => {
                alert("删除成功");
                this.loadJobList();
            }, errMsg => {
                alert("删除失败");
                // _mm.errorTips(errMsg);
            });
        }
    }
    stopJob(id,status){
        if(status==0){
            _job.executeJob(id).then(response => {
                alert("启动成功");
                this.loadJobList();
            }, errMsg => {
                alert("启动失败");
            });
        }else{
            _job.pauseJob(id).then(response => {
                alert("暂停成功");
                this.loadJobList();
            }, errMsg => {
                alert("暂停失败");
            });
           
        }  
    }
  //打开模式窗口
  openModelClick(id){
    this.setState({ visible: true,dictionaryList:[],paramValue:id,totald:0},function(){
      this.loadModelData(id);
    });
  }
  //调用模式窗口内的数据查询
   loadModelData(param){
    let page = {};
    page.pageNumd  = this.state.pageNumd;
    page.perPaged  = 10;
    page.searchDictionary=this.state.searchDictionary;
    page.job_id=param;
        _job.getJobExecuteByJobId(page).then(response=>{
             this.setState({dictionaryList:response.data.resultRows,totald:response.data.resultTotal});
        }).catch(error=>{
            this.setState({loading:false});
            message.error(error);
        });
    }
    // 字典页数发生变化的时候
    onPageNumdChange(pageNumd){
        this.setState({
            pageNumd : pageNumd
        }, () => {
            this.loadModelData(this.state.paramValue);
        });
    }
    //模式窗口点击确认
    handleOk = (e) => {
        this.setState({visible: false,pageNumd:1});
    }
    //模式窗口点击取消
    handleCancel = (e) => {
        this.setState({visible: false, });
    }
   
    render(){
        // this.state.list.map((item,index)=>{
        //     item.key=index;
        // })
        const dataSource = this.state.list;
        const columns = [{
            title: '任务编号',
            dataIndex: 'id',
            key: 'id'
          },{
            title: '任务名称（英文）',
            dataIndex: 'job_name',
            key: 'job_name',
            render: function(text, record, index) {
               return <Link to={ `/Job/JobLog/${record.id}` }>{text}</Link>;
             } 
          }, {
            title: '任务组别',
            dataIndex: 'job_group',
            key: 'job_group',
           
          },{
            title:'任务表达式',
            dataIndex:'job_cron',
            key:'job_cron'
          },
        {
            title: '任务描述',
            dataIndex: 'job_describe',
            key: 'job_describe'
       
        }, 
        {
            title: '运行状态',
            dataIndex: 'job_status',
            key: 'job_status',
            render: (text, record) => (
                <span>
                   {record.job_status=='0'?'停用':'启用'}
                </span>
            ),
          },{
            title: '操作',
            dataIndex: '操作',
            render: (text, record) => (
                <span>
                  <Link to={ `/Job/JobInfo/${record.id}` }>编辑</Link>
                  <Divider type="vertical" />
                  <a onClick={()=>this.deleteJob(`${record.id}`,`${record.job_status}`)} href="javascript:;">删除</a>
                  <Divider type="vertical" />
                  <a onClick={()=>this.stopJob(`${record.id}`,`${record.job_status}`)} href="javascript:;">{record.job_status=='1'?'暂停':'启用'}</a>
                  <Divider type="vertical" />
                  <a onClick={e=>this.openModelClick(`${record.id}`)}  href="javascript:;">查看任务执行</a>
                </span>
              ),
          }];
          const dictionaryColumns=[{
                title: '任务编号',
                dataIndex: 'id',
                key: 'id'
            // }, {
            //     title: '任务名称',
            //     dataIndex: 'job_name',
            //     key: 'job_name',
            }, {
                title: '开始时间',
                dataIndex: 'begin_time',
                key: 'begin_time',

            }, {
                title: '结束进间',
                dataIndex: 'end_time',
                key: 'end_time'
            }, {
                title: '执行结果',
                dataIndex: 'job_process',
                key: 'job_process',
            }, {
                title: '失败原因',
                dataIndex: 'job_failure_reason',
                key: 'job_failure_reason'
            }, {
                title: '任务状态',
                dataIndex: 'job_status',
                key: 'job_status',
                render: (text, record) => (
                        <span>
                        {record.job_status== '0' ? '暂停': '启用'}
                        </span>
                )       
            }, {
                title: '操作',
                dataIndex: '操作',
                render: (text, record) => (
                    <span>
                    <Link to={`/Job/jobLog/${record.id}`}>日志</Link>
                    </span>
                ),
            }];
        return (
            <div id="page-wrapper">
            <Card title="任务列表">
                <Tooltip>
                     <Search
                        style={{ width: 300,marginBottom:'10px' }}
                        placeholder="请输入..."
                        enterButton="查询"
                        onSearch={value => this.onSearch(value)}
                        />
                </Tooltip>
                <Tooltip>
                    <Button href="#/Job/JobInfo/null" style={{ float: "right", marginRight: "30px" }} type="primary">新建任务</Button>
                </Tooltip>
                
                <Table dataSource={this.state.list} columns={columns}  pagination={false}/>
                <Pagination current={this.state.pageNum} 
                        total={this.state.total}  showTotal={total => `共 ${this.state.total}条`}
                        onChange={(pageNum) => this.onPageNumChange(pageNum)}/> 
            </Card>
            <div>
                <Modal  title="执行结果列表" width='800px' visible={this.state.visible}  onOk={this.handleOk} onCancel={this.handleCancel}>
                    {/* <Search
                        style={{ width: 300,marginBottom:'10px' }}
                        placeholder="请输入..." enterButton="查询"
                        onSearch={value => this.onDictionarySearch(value)}
                        /> */}
                        <Table ref="diction"  columns={dictionaryColumns} 
                        dataSource={this.state.dictionaryList} size="small" bordered  pagination={false}/>
                        <Pagination current={this.state.pageNumd} 
                        total={this.state.totald}  showTotal={total => `共 100条`}
                        onChange={(pageNum) => this.onPageNumdChange(pageNum)}/> 
                </Modal>
            </div>
            </div>
        )
    }
}

export default JobList;