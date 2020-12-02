import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <h1>你访问的页面不存在</h1>
                <p>点击尝试<Link to='/'>返回首页</Link></p>
            </div>
        )
    }
}
