import React        from 'react';
import { Link }             from 'react-router-dom';
import JobService                 from '../../service/JobService.jsx';
import {Table,Divider,Button,Card, Tooltip,Input,Modal}  from 'antd';
import  LocalStorge         from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const _job = new JobService();

class JobLog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            list            : [],
            seconds: 0
        };
    }
    tick = () => {
        const { seconds } = this.state;
        this.setState({
            seconds: seconds + 1
        });
        this.loadlogList();
    }
    componentDidMount(){
         
         this.interval = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    loadlogList(){
       // console.log(this.state.seconds);
        _job.getList().then(response => {
            this.setState({list:[...this.state.list,{id:this.state.seconds}]});
        }, errMsg => {
            this.setState({
                list : []
            });
        });
    }
    render(){
        const columns = [{
            title: '日志编号',
            dataIndex: 'id',
            key: 'id'
          },{
            title: '日志信息',
            dataIndex: 'job_log',
            key: 'job_log',
           
          }];
         
        return (
            <div id="page-wrapper">
                <Card title="日志列表">
                <div>Seconds:{this.state.seconds}</div>
                    <Table dataSource={this.state.list} columns={columns}  pagination={false}/>
                </Card>
            </div>
        )
    }
}

export default JobLog;