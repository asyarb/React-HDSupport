import React, { Component } from 'react';
import axios from 'axios';

export const LayoutContext = React.createContext();

export class LayoutProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: '',
            username: '',
            firstName: '',
            fullScreen: false,
            loaded: false,
            roles: {},
        };
    }

    changeSize = () => {
        this.setState(prevState => {
            return { fullScreen: !prevState.fullScreen };
        });
    };

    async componentDidMount() {
        try {
            const request = await axios.get('/get-session-variables.php');
            const data = request.data;

            const nameRequest = axios.get(`/get-name.php?uuid=${data.uuid}`);
            const rolesRequest = axios.get(`/get-roles.php?username=${data.username}`);

            const userData = await Promise.all([nameRequest, rolesRequest]);
            const nameData = userData[0].data;
            const rolesData = userData[1].data;

            const roles = {
                helpDesk: rolesData.helpdesk === 'yes' ? true : false,
                lab: rolesData.lab === 'yes' ? true : false,
                tech: rolesData.tech === 'yes' ? true : false,
                staff: rolesData.staff === 'yes' ? true : false,
                admin: rolesData.administrator === 'yes' ? true : false,
                manager: rolesData.manager === 'yes' ? true : false,
            };

            this.setState({
                uuid: data.uuid,
                username: data.username,
                roles: roles,
                firstName: nameData.first_name,
                loaded: true,
            });
        } catch (error) {
            console.log('Unable to fetch session data from server');
        }
    }

    render() {
        const { children } = this.props;

        return (
            <LayoutContext.Provider
                value={{
                    fullScreen: this.state.fullScreen,
                    uuid: this.state.uuid,
                    username: this.state.username,
                    changeSize: this.changeSize,
                    loaded: this.state.loaded,
                    roles: this.state.roles,
                    firstName: this.state.firstName,
                }}
            >
                {children}
            </LayoutContext.Provider>
        );
    }
}

export const LayoutConsumer = LayoutContext.Consumer;
