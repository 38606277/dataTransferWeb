import React from 'react';
import { Form, Input, Select, Button, Card, Row, Col } from 'antd';
import LocalStorge from '../../util/LogcalStorge.jsx';
import FndvarService from '../../service/FndvarService.jsx';
import TextArea from 'antd/lib/input/TextArea';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/theme/ambiance.css';
const _fndvar = new FndvarService();
const localStorge = new LocalStorge();
const FormItem = Form.Item;
const options = {
  lineNumbers: true,                //显示行号  
  mode: { name: "text/x-mysql" },          //定义mode  
  extraKeys: { "Ctrl": "autocomplete" },//自动提示配置  
  theme: "default"
};

class FndvarInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      action: this.props.match.params.action,
      var_name: this.props.match.params.var_name,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
  }

  //初始化加载调用方法
  componentDidMount() {
       if(null!=this.state.action && 'Create'!=this.state.action){
        _fndvar.getFndvarInfo(this.state.var_name).then(response => {
                this.props.form.setFieldsValue(response.data);
                this.refs.editorsql.codeMirror.setValue(response.data.var_define);
                let editorsql = this.refs.editorsql;
                editorsql.codeMirror.setSize('100%', '500px');
                editorsql.codeMirror.border = "solid  1px";
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
        
        //values.var_name = this.state.var_name;
        values.var_define = this.refs.editorsql.codeMirror.getValue();
        _fndvar.save(values,this.state.action).then(response => {
          alert("保存成功");
          window.location.href = "#/Fndvar";
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
        <Card title={this.state.action == 'Create' ? '新建脚本' : '编辑脚本'}>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="变量名称">
                  {getFieldDecorator('var_name', {
                    rules: [{ required: true, message: '请输入变量名称!' }],
                  })(
                    <Input type='text' name='var_name' />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem {...formItemLayout} label="变量类型">
                  {getFieldDecorator('var_type', {
                    rules: [{ required: true, message: '请输入变量类型!' }],
                  })(
                    <Input type='text' name='var_type' />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={4} style={{textAlign:'right'}}>
                <FormItem label='变量内容'>
                </FormItem>
              </Col>
              <Col span={20}>
                    <CodeMirror ref="editorsql" value='' style={{ height: '600px', width: '450px', border: "1px" }} options={options} />
              </Col>
            </Row>
            <FormItem {...BtnFormItemLayout}>
              <Button type="primary" htmlType="submit" style={{ marginLeft: '30px' }}>保存</Button>
              <Button href="#/Fndvar" type="primary" style={{ marginLeft: '30px' }}>返回</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
export default Form.create()(FndvarInfo);
