import React, { Component } from 'react'
import { getData } from '../utils/utils'

import Comment from '../utils/Comment'
export default class Shouye extends Component {
    state = {
        list: []
    }
    componentDidMount() {
        getData('BAI6I0O5wangning')
            .then(data => {
                console.log(data);
                this.setState({
                    list: data
                })
            })

    }
    render() {
        return (
            <div>
                {this.state.list.map(item => <Comment key={item.docid} item={item} />)}
            </div>
        )
    }
}