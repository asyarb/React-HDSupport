import React from 'react';
import styled from 'styled-components';

import { DropdownSection, Heading, Description, ListItem } from './Components';
import { ReactComponent as Schedule } from '../../../images/icons/Administration/Schedule.svg';
import { ReactComponent as Account } from '../../../images/icons/Administration/Account.svg';
import { ReactComponent as Browser } from '../../../images/icons/Administration/Browser.svg';
import { ReactComponent as Waiver } from '../../../images/icons/Administration/Waiver.svg';
import { ReactComponent as Database } from '../../../images/icons/Administration/Database.svg';

const AdministrationDropdownEl = styled.div`
    width: 370px;
`;

const AdministrationDropdown = () => {
    return (
        <AdministrationDropdownEl>
            <DropdownSection data-first-dropdown-section>
                <ul>
                    <ListItem>
                        <a href="/">
                            <Heading color="pink">
                                <Schedule />
                                Schedule Management
                            </Heading>
                            <Description>
                                Edit &amp; view schedules/timesheets.
                            </Description>
                        </a>
                    </ListItem>
                    <ListItem>
                        <a href="/">
                            <Heading color="pink">
                                <Account />
                                Account Management
                            </Heading>
                            <Description>
                                Add/Edit users to HDSupport.
                            </Description>
                        </a>
                    </ListItem>
                    <ListItem noMarginBottom>
                        <a href="/">
                            <Heading color="pink">
                                <Browser />
                                Browser Recommendations
                            </Heading>
                            <Description>
                                Manage the browser matrix.
                            </Description>
                        </a>
                    </ListItem>
                </ul>
            </DropdownSection>
            <DropdownSection>
                <ul>
                    <ListItem>
                        <a href="/">
                            <Heading color="pink">
                                <Waiver />
                                Waiver Management
                            </Heading>
                        </a>
                    </ListItem>
                    <ListItem noMarginBottom>
                        <a href="/">
                            <Heading color="pink">
                                <Database />
                                PHP MyAdmin
                            </Heading>
                        </a>
                    </ListItem>
                </ul>
            </DropdownSection>
        </AdministrationDropdownEl>
    );
};

export default AdministrationDropdown;