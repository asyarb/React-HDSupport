import React, { Component } from 'react';
import styled from 'styled-components';
import { ClockContext } from './ClockContext';

class Timestamp extends Component {
    render() {
        let value = this.context;
        const { lastClock } = value;
        const { action, dayOfWeek, time, date, comments } = lastClock;

        return (
            <Container>
                <Title>Last Clock-{action}</Title>
                <Stamp>
                    <h4>Your Timestamp:</h4>
                    <span>{dayOfWeek}</span>
                    <span>{time}</span>
                    <span>{date}</span>
                </Stamp>
                <Comments>
                    <h4>Your Comments:</h4>
                    <p>{comments}</p>
                </Comments>
            </Container>
        );
    }
}

Timestamp.contextType = ClockContext;

export default Timestamp;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    color: var(--white);
    background: linear-gradient(135deg, #44609e, #3192bb);
    border-radius: 0 4px 4px 0;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
    padding: 30px;

    h4 {
        font-weight: 600;
        font-size: 16px;
        font-style: italic;
        margin: 0 0 12px;
    }
`;

const Title = styled.h2`
    font-size: 20px;
    letter-spacing: 0.065em;
    text-transform: uppercase;
    padding-bottom: 24px;
    font-weight: 600;
    border-bottom: 1px solid #d2d1d1cc;
    margin: 0;
`;

const Stamp = styled.div`
    span {
        font-size: 15px;
        display: block;
    }
`;

const Comments = styled.div`
    padding-top: 24px;
    border-top: 1px solid #d2d1d1cc;

    p {
        margin: 12px 0 0 0;
    }
`;