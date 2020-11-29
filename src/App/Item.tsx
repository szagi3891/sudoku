import styled from "@emotion/styled";
import { observer } from "mobx-react";
import { CellType } from "src/AppState/AppState";
import { SudokuValue } from "src/AppState/NumberItem";

const Wrapper = styled('div')`
    border: ${props => props.theme.config.itemBorderSize}px solid green;
    width: ${props => props.theme.config.itemWidthSize}px;
    height: ${props => props.theme.config.itemWidthSize}px;
`;

interface PropsType {
    cell: CellType,
}

export const Item = observer((props: PropsType) => {
    const value = props.cell.number.value;

    if (value === null) {
        return (
            <Wrapper/>
        );
    }

    return (
        <Wrapper>
            <ItemNumber number={value} />
        </Wrapper>
    );
});

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

const ItemNumber = observer((props: ItemNumberPropsType) => {
    return (
        <ItemNumberWrapper>
            { props.number }
        </ItemNumberWrapper>
    )
})