import { observer } from 'mobx-react';
import styled from '@emotion/styled';
import { Group } from './Group';
import { useAppStateContext } from 'src/Context';

const Center = styled('div')`
    display: flex;
    justify-content: center;
`;

const Wrapper = styled('div')`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    flex-shrink: 0;

    width: ${props => props.theme.config.allWidth}px;
    height: ${props => props.theme.config.allWidth}px;

    border: 2px solid blue;
`;

export const App = observer(() => {
    const appState = useAppStateContext();

    const out: Array<React.ReactNode> = [];

    appState.grid.forEach((x, y, square) => {
        out.push(
            <Group key={`${x}_${y}`} square={square}/>
        );
    });

    return (
        <Center>
            <Wrapper>
                { out }
            </Wrapper>
        </Center>
    );
});