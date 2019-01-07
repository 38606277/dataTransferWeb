import React        from 'react';
import { Link }             from 'react-router-dom';
import JobService                 from '../../service/JobService.jsx';
import Pagination           from 'antd/lib/pagination';
import {Table,Divider,Button,Card, Tooltip,Input}  from 'antd';
import  LocalStorge         from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const _user = new JobService();
const Search = Input.Search;

class JobList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [{
                id:1,
                jobName:"abc",
                jobGroup:"ys",
                jobDescribe:"预算部门信息ETL",
                jobCron:"dfdfd",
            }],
            pageNumd         : 1,
            perPaged        : 10,
            listType        :'list',
            searchKeyword:''
        };
    }
    componentDidMount(){
        // this.loadUserList();
    }
    loadUserList(){
        let listParam = {};
        listParam.pageNumd  = this.state.pageNumd;
        listParam.perPaged  = this.state.perPaged;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.keyword    = this.state.searchKeyword;
        }
        _user.getList(listParam).then(response => {
           // console.log(response);
            this.setState({list:response.data});
        }, errMsg => {
            this.setState({
                list : []
            });
            // _mm.errorTips(errMsg);
        });
    }
    // 页数发生变化的时候
    onPageNumChange(pageNumd){
        this.setState({
            pageNumd : pageNumd
        }, () => {
            this.loadUserList();
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
            pageNumd         : 1,
            searchKeyword   : searchKeyword
        }, () => {
            this.loadUserList();
        });
    }
    deleteUser(id){
        if(confirm('确认删除吗？')){
            _user.delUser(id).then(response => {
                alert("删除成功");
                this.loadUserList();
            }, errMsg => {
                alert("删除失败");
                // _mm.errorTips(errMsg);
            });
        }
    }

    render(){
        // this.state.list.map((item,index)=>{
        //     item.key=index;
        // })
        const dataSource = this.state.list;
        let self = this;
          const columns = [{
            title: '任务编号',
            dataIndex: 'id',
            key: 'id'
          },{
            title: '任务名称（英文）',
            dataIndex: 'jobName',
            key: 'jobName',
            render: function(text, record, index) {
               return <Link to={ `/user/UserView/${record.id}` }>{text}</Link>;
             } 
          }, {
            title: '任务组别',
            dataIndex: 'jobGroup',
            key: 'jobGroup',
           
          },{
            title:'任务表达式',
            dataIndex:'jobCron',
            key:'jobCron'
          },
        {
            title: '任务描述',
            dataIndex: 'jobDescribe',
            key: 'jobDescribe'
       
        }, {
            title: '是否启用',
            dataIndex: 'jobStatusStr',
            key: 'jobStatusStr'
          },
          {
            title: '任务执行状态',
            dataIndex: 'jobStatusStr',
            key: 'jobStatusStr'
          },{
            title: '操作',
            dataIndex: '操作',
            render: (text, record) => (
                <span>
                  {record.userId!='1'? <Link to={ `/user/userInfo/${record.id}` }>编辑</Link>:''}
                  <Divider type="vertical" />
                  <a onClick={()=>this.deleteUser(`${record.id}`)} href="javascript:;">删除</a>
                  <Divider type="vertical" />
                  <a onClick={()=>this.deleteUser(`${record.id}`)} href="javascript:;">暂停</a>
                  <Divider type="vertical" />
                  <Link to={`/Job/JobExecInfo/1`}>查看任务执行</Link>
                </span>
              ),
          }];
       
        return (
            <div id="page-wrapper">
            <Card title="用户列表">
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
                 
            </Card>
                
            </div>
        )
    }
}

export default JobList;