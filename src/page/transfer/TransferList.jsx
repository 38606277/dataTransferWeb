import React        from 'react';
import { Link }             from 'react-router-dom';
import TransferService                 from '../../service/TransferService.jsx';
import Pagination           from 'antd/lib/pagination';
import {Table,Divider,Button,Card, Tooltip,Input,Modal}  from 'antd';
import  LocalStorge         from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const _transfer = new TransferService();
const Search = Input.Search;

class TransferList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            pageNumd         : 1,
            perPaged        : 10,
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
         this.loadTransferList();
    }
    loadTransferList(){
        let listParam = {};
        listParam.pageNumd  = this.state.pageNumd;
        listParam.perPaged  = this.state.perPaged;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.keyword    = this.state.searchKeyword;
        }
        _transfer.getList(listParam).then(response => {
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
            this.loadTransferList();
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
            this.loadTransferList();
        });
    }
    deleteTransfer(id){
        if(confirm('确认删除吗？')){
            _transfer.delTransfer(id).then(response => {
                alert("删除成功");
                this.loadTransferList();
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
            title: '脚本编号',
            dataIndex: 'transfer_id',
            key: 'transfer_id'
          },{
            title: '脚本名称',
            dataIndex: 'transfer_name',
            key: 'transfer_name',
            render: function(text, record, index) {
               return <Link to={ `/Transfer/TransferInfo/${record.transfer_id}` }>{text}</Link>;
             } 
          },{
            title: '操作',
            dataIndex: '操作',
            render: (text, record) => (
                <span>
                  <Link to={ `/Transfer/TransferInfo/${record.transfer_id}` }>编辑</Link>
                  <Divider type="vertical" />
                  <a onClick={()=>this.deleteTransfer(`${record.transfer_id}`)} href="javascript:;">删除</a>
                </span>
              ),
          }];
         
        return (
            <div id="page-wrapper">
            <Card title="脚本列表">
                <Tooltip>
                     <Search
                        style={{ width: 300,marginBottom:'10px' }}
                        placeholder="请输入..."
                        enterButton="查询"
                        onSearch={value => this.onSearch(value)}
                        />
                </Tooltip>
                <Tooltip>
                    <Button href="#/Transfer/TransferInfo/null" style={{ float: "right", marginRight: "30px" }} type="primary">新建脚本</Button>
                </Tooltip>
                
                <Table dataSource={this.state.list} columns={columns}  pagination={false}/>
                 
            </Card>
            
            </div>
        )
    }
}

export default TransferList;