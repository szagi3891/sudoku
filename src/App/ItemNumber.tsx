import styled from "@emotion/styled";
import { observer } from "mobx-react";
import { SudokuValue } from "src/AppState/NumberItem";

const ItemNumberWrapper = styled('div')`
    text-align: center;
    font-size: 40px;
    color: blue;
    height: ${props => props.theme.config.itemWidthSize}px;
    line-height: ${props => props.theme.config.itemWidthSize}px;
`;

interface ItemNumberPropsType {
    number: SudokuValue
}

export const ItemNumber = observer((props: ItemNumberPropsType) => {
    return (
        <ItemNumberWrapper>
            { props.number }
        </ItemNumberWrapper>
    )
})