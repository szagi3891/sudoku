import styled from "@emotion/styled";
import { observer } from "mobx-react";

const Wrapper = styled('div')`
    border: ${props => props.theme.config.itemBorderSize}px solid green;
    width: ${props => props.theme.config.itemWidthSize}px;
    height: ${props => props.theme.config.itemWidthSize}px;
`;

export const Item = observer(() => {
    return (
        <Wrapper>
            5
        </Wrapper>
    );
});
