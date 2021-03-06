import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
// 页面
import JobList from './JobList.jsx';
import JobInfo from './JobInfo.jsx';
import JobExecInfo from './jobExecInfo.jsx';
import JobLog from './JobLog.jsx';

class RouterJob extends React.Component{
    render(){
        return (
            <Switch>
                 <Route path="/Job/JobList" component={JobList} />
                 <Route path="/Job/JobInfo/:id" component={JobInfo} />
                 <Route path="/Job/JobExecInfo/:id" component={JobExecInfo} />
                 <Route path="/Job/JobLog/:id" component={JobLog} />
                 <Redirect exact from="/Job" to="/Job/JobList"/> 
            </Switch>
        )
    }
}
export default RouterJob;