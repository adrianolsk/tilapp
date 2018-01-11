import React, {Component} from 'react'

class Posts extends Component{

    render(){
        const category = 'something'
        // const {category} = this.props.match.params
        return(
            <div>lista de posts de {category}
            <pre>{JSON.stringify(this.props, null,2)}</pre>
            </div>
        );
    }
}

export default Posts