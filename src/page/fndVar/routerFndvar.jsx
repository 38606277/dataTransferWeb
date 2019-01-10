import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import FndvarList from './FndvarList.jsx';
import FndvarInfo from './FndvarInfo.jsx';

class RouterFndvar extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/Fndvar/FndvarList" component={FndvarList} />
                 <Route path="/Fndvar/FndvarInfo/:action/:var_name" component={FndvarInfo} />
                 <Redirect exact from="/Fndvar" to="/Fndvar/FndvarList"/> 
            </Switch>
        )
    }
}
export default RouterFndvar;