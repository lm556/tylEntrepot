import React, { Component } from 'react'

import { HashRouter, Route, Switch } from 'react-router-dom'
import Nac from './components/Nac'
import Caijing from './pages/Caijing'
import Guoji from './pages/Guoji'
import Guonei from './pages/Guonei'
import Junshi from './pages/Junshi'
import Keji from './pages/Keji'
import NotFound from './pages/NotFound'
import shishang from './pages/shishang'
import Shouye from './pages/Shouye'

export default class App extends Component {

  render() {
    return (
      <div className='box'>
        <HashRouter>
          <Nac />
          {/* 路由 */}
          <Switch>
            <Route exact path='/' component={Shouye} />
            <Route path='/guonei' component={Guonei} />
            <Route path='/guoji' component={Guoji} />
            <Route path='/caijing' component={Caijing} />
            <Route path='/junshi' component={Junshi} />
            <Route path='/keji' component={Keji} />
            <Route path='/shishang' component={shishang} />
            {/* 404页面 */}
            <Route path='*' component={NotFound} />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}
