import React, { Component } from 'react'
import './comment.less'

export default class Comment extends Component {
    render() {
        let temp = this.props.item
        return (
            <div className='newLIst'>
                <div className='newLIst-left'>
                    <img src={temp.imgsrc} alt="" />
                </div>
                <div className='newLIst-right'>
                    <p className='title'>{temp.title}</p>
                    <p className='desc'>{temp.digest}</p>
                </div>
            </div>
        )
    }
}
