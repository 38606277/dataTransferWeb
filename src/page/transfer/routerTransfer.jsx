import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import TransferList from './TransferList.jsx';
import TransferInfo from './TransferInfo.jsx';

class RouterTransfer extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/Transfer/TransferList" component={TransferList} />
                 <Route path="/Transfer/TransferInfo/:transfer_id" component={TransferInfo} />
                 <Redirect exact from="/Transfer" to="/Transfer/TransferList"/> 
            </Switch>
        )
    }
}
export default RouterTransfer;