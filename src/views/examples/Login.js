/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState} from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
} from "reactstrap";
import TokenDataService from "../../services/TokenService";
import {Redirect, Route} from "react-router-dom";


const Login = () => {
    const initialLoginState = {
        login: "",
        password: ""
    };
    const [login, setLogin] = useState(initialLoginState);
    const [submitted, setSubmitted] = useState(false);
    const [token, setToken] = useState("");

    const handleInputChange = event => {
        const {name, value} = event.target;
        setLogin({...login, [name]: value});
    };

    function getToken() {
        let json = {
            login: login.login,
            password: login.password
        };
        TokenDataService.getToken(json)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                setToken(response.data.token);
                //console.log(response.data);
            })
            .catch(e => {
                console.log(e.response.data);
            });

    }


    function PrivateRoute({children, ...rest}) {
        let auth = localStorage.getItem('token');
        return (
            <Route
                {...rest}
                render={({location}) =>
                    token != "" ? (
                        <h1>teste</h1>
                        //children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {from: location}
                            }}
                        />
                    )
                }
            />
        );
    }


    return (
        <>

            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                        <Form role="form" className="mt-4">
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Login"
                                        type="login"
                                        autoComplete="login"
                                        name="login" value={login.login} onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        autoComplete="password"
                                        name="password" value={login.password} onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <div className="custom-control custom-control-alternative custom-checkbox">
                                <input
                                    className="custom-control-input"
                                    id=" customCheckLogin"
                                    type="checkbox"
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor=" customCheckLogin"
                                >
                                    <span className="text-muted">Lembrar-me</span>
                                </label>
                            </div>
                            <div className="text-center">
                                <Button className="my-4" color="primary" type="button" onClick={getToken}>
                                    Logar
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
            <pre>
            <PrivateRoute path="/admin/index">
                <h1>teste</h1>
            </PrivateRoute>
            </pre>
        </>
    );
};

export default Login;
