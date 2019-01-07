import React from 'react';
import { Form, Input, Select, Button, Card, Row, Col } from 'antd';
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
      id: this.props.match.params.id
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
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
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
                <FormItem {...formItemLayout} label='任务描述'>
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
                    <Input type='text' name='jobCron' />
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
      </div>
    );
  }
}
export default Form.create()(JobInfo);
