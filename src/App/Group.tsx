import { observer } from "mobx-react";
import styled from '@emotion/styled';
import { Item } from './Item';

const Wrapper = styled('div')`
    border: ${props => props.theme.config.groupBorderSize}px solid black;

    width: ${props => props.theme.config.groupWidthSize}px;
    height: ${props => props.theme.config.groupWidthSize}px;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    flex-shrink: 0;
`;

export const Group = observer(() => {
    return (
        <Wrapper>
            <Item />
            <Item />
            <Item />

            <Item />
            <Item />
            <Item />

            <Item />
            <Item />
            <Item />
        </Wrapper>
    );
});

