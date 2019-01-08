import React from 'react';
import { Form, Input, Select, Button, Card, Row, Col,Modal } from 'antd';
import LocalStorge from '../../util/LogcalStorge.jsx';
import JobService from '../../service/JobService.jsx';
const JobServices = new JobService();
const localStorge = new LocalStorge();
const FormItem = Form.Item;
const Option = Select.Option;

class JobInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      id: this.props.match.params.id,
      visible:false,
      seconds:"",
      minutes:"",
      hours:"",
      day:"",
      month:"",
      week:"",
      year:"",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
  }

  //初始化加载调用方法
  componentDidMount() {
    //    if(null!=this.state._name && ''!=this.state._name  && 'null'!=this.state._name){
    //         JobServices.getJobService(this.state._name).then(response => {
    //            // this.setState(response);
    //             this.props.form.setFieldsValue(response);

    //         }, errMsg => {
    //             this.setState({});
    //             localStorge.errorTips(errMsg);
    //         });
    //     }

  }


  //编辑字段对应值
  onValueChange(e) {
    let name = e.target.name,
      value = e.target.value.trim();
    //this.setState({[name]:value});  
    this.props.form.setFieldsValue({ [name]: value });

  }
 //编辑字段对应值
 onValueChangetwo(e) {
  let name = e.target.name,
    value = e.target.value.trim();
    console.log(name+"=",value);
  this.setState({[name]:value});

}
  //提交
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.id = this.state.id;
        JobServices.save(values).then(response => {
          alert("保存成功");
          window.location.href = "#/Job";
        }, errMsg => {
          this.setState({});
          localStorge.errorTips(errMsg);
        });
      }
    });
  }

  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
 //打开模式窗口
 openModelClick(e){
   let vl=e.target.value;
   let seconds="",minutes="",hours="",day="", month="", week="", year="";
   if(vl!='' && vl!=null){
      let arr= vl.split(" ");
      seconds=arr[0];
      minutes=arr[1];
      hours=arr[2];
      day=arr[3];
      month=arr[4];
      week=arr[5];
      year=arr[6];
   }
    this.setState({ visible: true, seconds:seconds,minutes:minutes, 
      hours:hours,day:day, month:month,week:week, year:year,},function(){});
  }
  //模式窗口点击确认
  handleOk = (e) => {
    let corns=this.state.seconds+" "+this.state.minutes+" "+this.state.hours+" "+this.state.day+" "+this.state.month+" "+this.state.week+" "+this.state.year;
    // console.log(corns);
    this.setState({visible: false,jobCron:corns, seconds:"",minutes:"",hours:"",day:"",month:"", week:"",year:"",});
    
    this.props.form.setFieldsValue({ ['jobCron']: corns });
  }
  //模式窗口点击取消
  handleCancel = (e) => {
    this.setState({visible: false, seconds:"",minutes:"",hours:"",day:"",month:"", week:"",year:""});
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: {span: 20},
        sm: {pan: 20},
      },
    };

    return (
      <div id="page-wrapper">
        <Card title={this.state.id == 'null' ? '新建任务' : '编辑任务'}>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="任务名称（英文）">
                  {getFieldDecorator('jobName', {
                    rules: [{ required: true, message: '请输入任务名称（英文）!' }],
                  })(
                    <Input type='text' name='jobName' />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label='任务组别（英文）' >
                  {getFieldDecorator('jobGroup', {
                    rules: [{ required: true, message: '请选择任务组别（英文）!', whitespace: true }],
                  })(
                    <Input type='text' name='jobGroup' />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...tailFormItemLayout} label='任务描述'>
                  {getFieldDecorator('jobDescribe', {
                    rules: [{ required: true, message: '请输入任务描述!', whitespace: true }],
                  })(
                    <Input type='text' name='jobDescribe' />
                  )}
                </FormItem>
              </Col>
             
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label='Cron表达式' >
                  {getFieldDecorator('jobCron', {
                    rules: [{ required: true, message: '请输入Cron表达式!', whitespace: true }],
                  })(
                    <Input type='text' name='jobCron' onClick={(e)=>this.openModelClick(e)}/>
                  )}
                </FormItem>
              </Col>


              <Col span={12}>
                <FormItem {...formItemLayout} label='任务脚本'>
                  {getFieldDecorator('jobClassPath', {
                    rules: [{ required: true, message: '请选择任务脚本!', whitespace: true }],
                  })(
                    <Select style={{ minWidth: '300px' }}  >
                        <Option key="" value="">预算部门信息</Option>
                        <Option key="" value="">预算部门信息</Option>
                        <Option key="" value="">预算部门信息</Option>
                        <Option key="" value="">预算部门信息</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
       
            <Row>
              <Col span={12} >

                <FormItem {...formItemLayout} label='任务状态'>
                  {getFieldDecorator('jobDataMap', {
                    rules: [{ required: false, message: '请输入任务关联脚本ID!', whitespace: true }],
                  })(
                    <Select style={{ minWidth: '300px' }}  >
                    <Option key="" value="">启用</Option>
                    <Option key="" value="">停用</Option>
                </Select>
                  )}
                </FormItem>
              </Col>
            </Row>

            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" style={{ marginLeft: '30px' }}>创建</Button>
              <Button href="#/Job" type="primary" style={{ marginLeft: '30px' }}>返回</Button>
            </FormItem>
          </Form>
        </Card>
        <div>
              <Modal  title="corn表达式" width='800px' visible={this.state.visible}  onOk={this.handleOk} onCancel={this.handleCancel}>
                <Row>
                  <Col span={3}></Col>
                  <Col span={3}>秒</Col>
                  <Col span={3}>分钟</Col>
                  <Col span={3}>时</Col>
                  <Col span={3}>日</Col>
                  <Col span={3}>月</Col>
                  <Col span={3}>星期</Col>
                  <Col span={3}>年</Col>
                </Row>
                <Row>
                  <Col span={3}>表达式字段</Col>
                  <Col span={3}><Input name='seconds' value={this.state.seconds} onChange={(e)=>this.onValueChangetwo(e)} style={{width:80}}/></Col>
                  <Col span={3}><Input name='minutes' value={this.state.minutes} onChange={(e)=>this.onValueChangetwo(e)} style={{width:80}}/></Col>
                  <Col span={3}><Input name='hours' value={this.state.hours} onChange={(e)=>this.onValueChangetwo(e)} style={{width:80}}/></Col>
                  <Col span={3}><Input name='day' value={this.state.day} onChange={(e)=>this.onValueChangetwo(e)} style={{width:80}}/></Col>
                  <Col span={3}><Input name='month' value={this.state.month} onChange={(e)=>this.onValueChangetwo(e)} style={{width:80}}/></Col>
                  <Col span={3}><Input name='week' value={this.state.week} onChange={(e)=>this.onValueChangetwo(e)} style={{width:80}}/></Col>
                  <Col span={3}><Input name='year' value={this.state.year} onChange={(e)=>this.onValueChangetwo(e)} style={{width:80}}/></Col>
                </Row>
              </Modal>
          </div>
      </div>
    );
  }
}
export default Form.create()(JobInfo);
