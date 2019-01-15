import React        from 'react';
import Circle from 'react-circle';
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
            seconds: 0,
            score: 0,
            total:0,num:0
        };
    }
    tick = () => {
        const { seconds } = this.state;
        this.setState({ seconds: seconds + 1});
        if(this.state.total!=0 && this.state.num!=this.state.total){
            this.loadlogList();
        }else if(this.state.total==0 && this.state.num==0){
            this.loadlogList();
        }
    }
    
    componentDidMount(){
         this.interval = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
   
    loadlogList(){
        _job.getJobExecutePorcess(this.state.id).then(response => {
            if(response.resultCode=='1000'){
                let num = parseFloat(response.data.current==null?0:response.data.current);
                let total = parseFloat(response.data.count==null?0:response.data.count);
                let score= total <= 0 ? "0" : (Math.round(num / total * 10000) / 100.00);
                // this.setState({list:[...this.state.list,{id:this.state.seconds}]});
                this.setState({ score: score,total:total,num:num });
            }
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
            <div style={{marginLeft: '350px'}}>
                    <Circle
                        progress={this.state.score}
                        size="160" // String: Defines the size of the circle.
                        lineWidth="25" // String: Defines the thickness of the circle's stroke.
                    />
                </div>
                <Card title="日志列表">
                     <div>Seconds:{this.state.seconds}</div>
                    <Table dataSource={this.state.list} columns={columns}  pagination={false}/>
                </Card>
            </div>
        )
    }
}

export default JobLog;