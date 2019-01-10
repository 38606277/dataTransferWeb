import React        from 'react';
import { Link }             from 'react-router-dom';
import FndvarService                 from '../../service/FndvarService.jsx';
import Pagination           from 'antd/lib/pagination';
import {Table,Divider,Button,Card, Tooltip,Input,Modal}  from 'antd';
import  LocalStorge         from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const _fndvar = new FndvarService();
const Search = Input.Search;

class FndvarList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            pageNum         : 1,
            perPage        : 10,
            listType        :'list',
            searchKeyword:'',
           
        };
    }
    componentDidMount(){
         this.loadFndvarList();
    }
    loadFndvarList(){
        let listParam = {};
        listParam.pageNum  = this.state.pageNum;
        listParam.perPage  = this.state.perPage;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.keyword    = this.state.searchKeyword;
        }
        _fndvar.getList(listParam).then(response => {
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
            this.loadFndvarList();
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
            this.loadFndvarList();
        });
    }
    deleteFndvar(id){
        if(confirm('确认删除吗？')){
            _fndvar.delFndvar(id).then(response => {
                alert("删除成功");
                this.loadFndvarList();
            }, errMsg => {
                alert("删除失败");
            });
        }
    }
   
    render(){
        // this.state.list.map((item,index)=>{
        //     item.key=index;
        // })
        const dataSource = this.state.list;
        const columns = [{
            title: '变量名称',
            dataIndex: 'var_name',
            key: 'var_name'
          },{
            title: '变量类型',
            dataIndex: 'var_type',
            key: 'var_type',
            
          },{
            title: '操作',
            dataIndex: '操作',
            render: (text, record) => (
                <span>
                  <Link to={ `/Fndvar/FndvarInfo/Update/${record.var_name}` }>编辑</Link>
                  <Divider type="vertical" />
                  <a onClick={()=>this.deleteFndvar(`${record.var_name}`)} href="javascript:;">删除</a>
                </span>
              ),
          }];
         
        return (
            <div id="page-wrapper">
            <Card title="全局变量列表">
                {/* <Tooltip>
                     <Search
                        style={{ width: 300,marginBottom:'10px' }}
                        placeholder="请输入..."
                        enterButton="查询"
                        onSearch={value => this.onSearch(value)}
                        />
                </Tooltip> */}
                <Tooltip>
                    <Button href="#/Fndvar/FndvarInfo/Create/null" style={{ float: "right", marginRight: "30px" }} type="primary">新建变量</Button>
                </Tooltip>
                
                <Table dataSource={this.state.list} columns={columns}  pagination={false}/>
                <Pagination current={this.state.pageNum} 
                        total={this.state.total}  showTotal={total => `共 ${this.state.total}条`}
                        onChange={(pageNum) => this.onPageNumChange(pageNum)}/> 
            </Card>
            
            </div>
        )
    }
}

export default FndvarList;