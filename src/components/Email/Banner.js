import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Breadcrumb from '../Admin/Breadcrumb';
import TextInput from '../TextInput';
import Button from '../Button';
import Checkbox from '../Checkbox';
import RadioButton from '../RadioButton';
import Preview from './Preview';

class Banner extends Component {
    state = {
        banner: '',
        staff: '',
        username: '',
        dept: 'ITS - Academic Technologies',
        bcc: true,
        from: 'banner-reset-l@lists.hawaii.edu',
        preview: false,
    };

    handleInput = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            preview: false,
            [name]: value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({
            preview: true,
        });
    };

    async componentDidMount() {
        try {
            const name = axios.get('/get-name.php?uuid=22051104');
            const username = axios.get('/get-username.php?uuid=22051104');

            const request = await Promise.all([name, username]);
            const data = await Promise.all([request[0].data, request[1].data]);

            this.setState({
                staff: data[0].first_name,
                username: data[1].username,
            });
        } catch (error) {
            console.log(`Error getting name: ${error}`);
        }
    }

    render() {
        const links = [
            { title: 'Email Generator', to: '/email' },
            { title: 'Banner PW Reset', to: '/email/banner' },
        ];

        const { banner, staff, dept, bcc, username, preview, from } = this.state;

        return (
            <Container>
                <h1>Banner Password Reset</h1>
                <Breadcrumb links={links} color="light-blue" />
                <FormEl onSubmit={this.handleSubmit}>
                    <Title>
                        <h2>Email Fields</h2>
                        <p>
                            Specify the appropriate info to fill the email template.
                            <br />
                            You can preview the full email before sending.
                        </p>
                    </Title>
                    <Text>
                        <TextInput
                            id="banneracct"
                            label="Banner Account to Reset"
                            placeholder="UH Username"
                            value={banner}
                            onChange={this.handleInput}
                            name="banner"
                        />
                        <TextInput
                            id="staff"
                            label="ITS Staff Name for Email"
                            placeholder="John Smith"
                            value={staff}
                            onChange={this.handleInput}
                            name="staff"
                        />
                        <TextInput
                            id="banneracct"
                            label="ITS Department on Email"
                            placeholder="Information Technology Services"
                            value={dept}
                            onChange={this.handleInput}
                            name="dept"
                        />
                    </Text>
                    <Options>
                        <Checkbox
                            id="bcc"
                            label="BCC Self on Email?"
                            name="bcc"
                            checked={bcc}
                            onChange={this.handleInput}
                            color="light-blue"
                        />
                        <Radios>
                            <RadioButton
                                id="personal"
                                label={`${username}@hawaii.edu`}
                                name="from"
                                value={`${username}@hawaii.edu`}
                                onChange={this.handleInput}
                                color="light-blue"
                            />
                            <RadioButton
                                id="bannerlist"
                                label="banner-reset-l@lists.hawaii.edu"
                                name="from"
                                value="banner-reset-l@lists.hawaii.edu"
                                onChange={this.handleInput}
                                color="light-blue"
                                defaultChecked
                            />
                        </Radios>
                    </Options>
                    <Button color="light-blue">Preview Email</Button>
                </FormEl>
                {preview && (
                    <Preview
                        first={banner}
                        bcc={bcc}
                        second={dept}
                        from={from}
                        third={staff}
                        subject="Banner Password Reset"
                        type="banner"
                        color="light-blue"
                    />
                )}
            </Container>
        );
    }
}

export default Banner;

const Container = styled.main`
    margin-top: 60px;

    > h1 {
        margin: 0 0 18px;
        font-weight: 600;
        font-size: 34px;
    }
`;

const FormEl = styled.form`
    background: var(--white);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    margin-top: 30px;
    display: flex;
    flex-direction: column;

    > button {
        margin-left: auto;
        max-width: 250px;
        width: 100%;
    }
`;

const Title = styled.div`
    h2 {
        font-size: 28px;
        font-weight: 600;
        margin: 0 0 4px;
        color: var(--light-blue);
    }

    p {
        margin: 0 0 12px;
        line-height: 1.5;
        color: var(--dark-grey);
    }
`;

const Options = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 15px 0;
    width: 100%;
`;

const Radios = styled.div`
    div {
        margin: 8px 0;
    }
`;

const Text = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 24px;

    > div {
        &:last-of-type {
            grid-column: 1/-1;
            width: 60%;
        }
    }
`;