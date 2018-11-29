import React, { Component } from 'react';
import axios from 'axios';

import { LayoutContext } from '../../LayoutContext';

export const ClockContext = React.createContext();

export class ClockProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            lastClock: {},
            clockedIn: null,
            loading: true,
        };
    }

    async componentDidMount() {
        try {
            let value = this.context;
            const { uuid } = value;

            const request = await axios.get(`/get-username.php?uuid=${uuid}`);
            const data = await request.data;

            const lastClockRequest = await axios.get(`/get-last-clock.php?username=${data.username}`);
            const clockData = await lastClockRequest.data;

            const time = `${clockData.hour}:${clockData.min} ${clockData.ampm}`;
            const date = `${clockData.month}-${clockData.day}-${clockData.year}`;

            this.setState({
                username: data.username,
                clockedIn: clockData.action === 'out' ? false : true,
                lastClock: {
                    action: clockData.action,
                    dayOfWeek: clockData.dow,
                    time: time,
                    date: date,
                    comments: clockData.comments,
                },
                loading: false,
            });
        } catch (error) {
            console.log(`Error fetching clock info: ${error}`);
        }
    }

    handleSubmit = async commentString => {
        const { username, clockedIn } = this.state;
        let action;
        if (clockedIn) action = 'out';
        else action = 'in';

        try {
            await axios.post('/clock-in.php', {
                username: username,
                comments: commentString,
                action: action,
            });

            this.refreshForm();
        } catch (error) {
            console.log(`Error clocking in/out: ${error}`);
        }
    };

    refreshForm = async () => {
        const lastClockRequest = await axios.get(`/get-last-clock.php?username=${this.state.username}`);
        const clockData = await lastClockRequest.data;

        const time = `${clockData.hour}:${clockData.min} ${clockData.ampm}`;
        const date = `${clockData.month}-${clockData.day}-${clockData.year}`;

        this.setState({
            clockedIn: clockData.action === 'out' ? false : true,
            lastClock: {
                action: clockData.action,
                dayOfWeek: clockData.dow,
                time: time,
                date: date,
                comments: clockData.comments,
            },
        });
    };

    render() {
        const { children } = this.props;

        return (
            <ClockContext.Provider
                value={{
                    username: this.state.username,
                    lastClock: this.state.lastClock,
                    clockedIn: this.state.clockedIn,
                    handleSubmit: this.handleSubmit,
                    loading: this.state.loading,
                }}
            >
                {children}
            </ClockContext.Provider>
        );
    }
}

ClockProvider.contextType = LayoutContext;

export const ClockConsumer = ClockContext.Consumer;