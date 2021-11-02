import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { Media, Form, FormGroup, FormControl, Button } from 'react-bootstrap';

	class GitHub extends Component {        
		constructor() {
            super();
            this.state = {
                data: [],
                searchTerm: '',
                isLoading: false
            };
            
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleSubmit(e) {
            e.preventDefault();
            this.setState({
                isLoading: true
            })
            
            this.getGitHubData(this.state.searchTerm);
        }

        handleChange(e) {
            this.setState({
                searchTerm: e.target.value
            })
        }
    
        componentDidMount() {
            //  Put in your GitHub handle below:
            // let handle = "jpscottranken";
            // this.getGitHubData(handle);
        }
		
		//	The axios get returns a promise to
		//	let us perform asynchronous behavior.
		//	Recall that a promise can be in one
		//	of three states: 1) Pending.
		//	2) Rejected.  3) Resolved.
		getGitHubData(handle) {
			axios.get("https://api.github.com/search/users?q="+handle)
			.then (res => {
                this.setState({
                    isLoading: false,
                    data: res.data.items    //  Assigned returned result to data array
                });
				//	This is our callback function
				console.log(res.data.items);
			});
		}
		
		render() {
            //  This uses map to repeat the media object
            //  for each user found from GitHub
            const listUsers = this.state.data.map((user) => 
            <Media key={user.id}>
                <a href={user.html_url}>
                    <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src={user.avatar_url}
                        alt="User"
                    />
                </a>
                <Media.Body>
                    <h5>Login: {user.login}</h5>
                    <p>Id: {user.id}</p>
                </Media.Body>
            </Media>
            );

			return (
				<div>
                    <Form inline onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formInlineName">
                            <Form.Control
                                type="text"
                                value={this.state.searchTerm}
                                placeholder="Enter search term here"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        {' '}
                        <Button type="submit">
                            Search
                        </Button>
                    </Form>
                    <h3>GitHub Users:</h3>
                    {
                        this.state.isLoading &&
                            // <h4>Loading data...</h4>
                            <ReactLoading 
                                type="spinningBubbles"
                                color="#444" />
                    }

                    {listUsers}
				</div>
			);
		}
	}
	
	export default GitHub;