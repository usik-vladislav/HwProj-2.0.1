import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography'
import { Redirect } from 'react-router-dom';
import { CoursesApi } from "../api/courses/api";
import AuthService from './AuthService';

interface ILoginState {
    email: string,
    password: string,
    logged: boolean,
}

export default class CreateCourse extends React.Component<{}, ILoginState> {
    Auth = new AuthService();
    state = {
        email: "",
        password: "",
        logged: false
    };        

    public handleSubmit(e: any) {
        e.preventDefault();
      
        this.Auth.login(this.state.email, this.state.password)
            .then((res : any) => this.setState({logged: true}))
            .catch((err : any) =>{
                alert(err);
            })
    }

    public render() {
        if (this.state.logged) {
            return <Redirect to={'/'} />
        }
        return (
            <div className="container">
                <Typography variant='h6' gutterBottom>Войти</Typography>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <TextField
                        required
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        name={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                    />
                    <br />
                    <TextField
                        required
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value})}
                    />
                    <Button size="small" variant="contained" color="primary" type="submit">Войти</Button>
                </form>
            </div>
        );
    }
}