import { observer } from "mobx-react";
import styled from '@emotion/styled';
import { Item } from './Item';

const Wrapper = styled('div')`
    border: 1px solid black;
    height: 90px;
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

