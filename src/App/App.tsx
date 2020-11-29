import { observer } from 'mobx-react';
import styled from '@emotion/styled';
import { Group } from './Group';

const Wrapper = styled('div')`
    border: 1px solid black;
    width: 270px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`;

export const App = observer(() => {
    return (
        <Wrapper>
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
            <Group />
        </Wrapper>
    );
});