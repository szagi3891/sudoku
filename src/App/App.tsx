import { observer } from 'mobx-react';
import styled from '@emotion/styled';
import { Group } from './Group';

const Wrapper = styled('div')`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    flex-shrink: 0;

    width: ${props => props.theme.config.allWidth}px;
    height: ${props => props.theme.config.allWidth}px;

    border: 2px solid blue;
`;

export const App = observer(() => {
    return (
        <>
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

            <br/><br/>
            
            <Group />
        </>
    );
});