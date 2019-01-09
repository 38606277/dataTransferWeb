import React from 'react';
import { Form, Input, Select, Button, Card, Row, Col } from 'antd';
import LocalStorge from '../../util/LogcalStorge.jsx';
import TransferService from '../../service/TransferService.jsx';
import TextArea from 'antd/lib/input/TextArea';
const _transfer = new TransferService();
const localStorge = new LocalStorge();
const FormItem = Form.Item;
const Option = Select.Option;

class TransferInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      transfer_id: this.props.match.params.transfer_id,
      visible:false,
      selectTransferList:[],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
  }

  //初始化加载调用方法
  componentDidMount() {
       if(null!=this.state.transfer_id && ''!=this.state.transfer_id  && 'null'!=this.state.transfer_id){
        _transfer.getTransferInfo(this.state.transfer_id).then(response => {
               // this.setState(response);
                this.props.form.setFieldsValue(response);
            }, errMsg => {
                this.setState({});
                localStorge.errorTips(errMsg);
            });
        }
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
    this.setState({[name]:value});
  }
  //编辑字段对应值
  onSelectChange(name,value){
    this.setState({[name]:value});  
    this.props.form.setFieldsValue({[name]:value});
  }
  //提交
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.transfer_id = this.state.transfer_id;
        _transfer.save(values).then(response => {
          alert("保存成功");
          window.location.href = "#/Transfer";
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
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: {span: 20},
        sm: {pan: 20},
      },
    };
    const BtnFormItemLayout = {
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
        <Card title={this.state.transfer_id == 'null' ? '新建脚本' : '编辑脚本'}>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="脚本名称">
                  {getFieldDecorator('transfer_name', {
                    rules: [{ required: true, message: '请输入脚本名称!' }],
                  })(
                    <Input type='text' name='transfer_name' />
                  )}
                </FormItem>
              </Col>
             
            </Row>
            <Row>
              <Col span={24}>
                <FormItem {...tailFormItemLayout} label='脚本内容'>
                  {getFieldDecorator('transfer_content', {
                    rules: [{ required: true, message: '请输入脚本内容!', whitespace: true }],
                  })(
                    <TextArea type='text' name='transfer_content' ></TextArea>
                  )}
                </FormItem>
              </Col>
             
            </Row>
           

            <FormItem {...BtnFormItemLayout}>
              <Button type="primary" htmlType="submit" style={{ marginLeft: '30px' }}>创建</Button>
              <Button href="#/Job" type="primary" style={{ marginLeft: '30px' }}>返回</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
export default Form.create()(TransferInfo);