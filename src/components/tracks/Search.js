import React, { Component } from 'react'
import axios from 'axios'
import {Consumer} from '../../context'

class Search extends Component {
    state={
        trackTitle:''
    }
    onChange=e=>{
        this.setState({[e.target.name]: e.target.value})
    }
    findTrack=(dispatch,e)=>{
        
        e.preventDefault()
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res=>{
            
            
            dispatch({
                type:'SEARCH_TRACKS',
                //step2=>fetching data from API and calling dispatch(action){//action is modified object} function present in context.js         
                payload:res.data.message.body.track_list
            })
            this.setState({trackTitle:' '})
        })
        .catch(err=>console.log(err))
    }
    render() {
        return (
            <Consumer>
                {value=>{
                    const {dispatch}=value
                    //step 1=>we are extracting dispatch function and will pass into another function viz. findTrack to fetch the result from API and changed the heading as well
                    return(
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center">
                                <i className="fas fa-music"></i>Search for Song
                            </h1>
                            <p className="lead text-center">Get me lyrics for any song </p>
                            <form onSubmit={this.findTrack.bind(this,dispatch)}>
                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg" 
                            placeholder="Song title..."
                            name="trackTitle"
                            value={this.state.tracktitle}
                            onChange={this.onChange}
                            />
                        </div>
                            <buttton className="btn btn-primary btn-lg btn-block mb-3" type="submit">Get Track Lyrics</buttton>

                            </form>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}
export default Search