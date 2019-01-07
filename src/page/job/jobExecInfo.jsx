import React from 'react';
import { Link } from 'react-router-dom';
import JobService from '../../service/JobService.jsx';
import Pagination from 'antd/lib/pagination';
import { Table, Divider, Button, Card, Tooltip, Input } from 'antd';
import LocalStorge from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const _user = new JobService();
const Search = Input.Search;


export default class JobExecInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{
        id: 1,
        jobName: "abc",
        jobGroup: "ys",
        begin_time: "2018-1-1 12:00:00",
        end_time: "2018-1-1  13:00:00",
        end_time: "2018-1-1  13:00:00",
        duration: "1小时"
      }],
      pageNumd: 1,
      perPaged: 10,
      listType: 'list',
      searchKeyword: ''
    };
  }



  render() {
    // this.state.list.map((item,index)=>{
    //     item.key=index;
    // })
    const dataSource = this.state.list;
    let self = this;
    const columns = [{
      title: '任务编号',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: '任务名称',
      dataIndex: 'jobName',
      key: 'jobName',
      render: function (text, record, index) {
        return <Link to={`/user/UserView/${record.id}`}>{text}</Link>;
      }
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
      dataIndex: 'jobClassPath',
      key: 'jobClassPath',
    },
    {
      title: '执行结果',
      dataIndex: 'duration',
      key: 'duration',
    }, {
      title: '失败原因',
      dataIndex: 'jobDescribe',
      key: 'jobDescribe'

    }, {
      title: '任务状态',
      dataIndex: 'jobStatusStr',
      key: 'jobStatusStr'
    }, {
      title: '操作',
      dataIndex: '操作',
      render: (text, record) => (
        <span>
          {record.userId != '1' ? <Link to={`/user/userInfo/${record.id}`}>编辑</Link> : ''}
        </span>
      ),
    }];

    return (
      <div id="page-wrapper">
        <Card title="用户列表">
          <Tooltip>
            <Search
              style={{ width: 300, marginBottom: '10px' }}
              placeholder="请输入..."
              enterButton="查询"
              onSearch={value => this.onSearch(value)}
            />
          </Tooltip>
          <Tooltip>
            <Button href="#/Job/JobInfo/null" style={{ float: "right", marginRight: "30px" }} type="primary">新建任务</Button>
          </Tooltip>

          <Table dataSource={dataSource} columns={columns} pagination={false} />
          <Pagination current={this.state.pageNumd}
            total={this.state.total}
            onChange={(pageNumd) => this.onPageNumChange(pageNumd)} />
        </Card>

      </div>
    )
  }
}