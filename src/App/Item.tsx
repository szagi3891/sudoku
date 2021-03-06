import styled from "@emotion/styled";
import { observer } from "mobx-react";
import { CellType } from "src/AppState/AppState";
import { ItemNumber } from './ItemNumber';
import { ItemPossible } from "./ItemPossible";

const Wrapper = styled('div')`
    border: ${props => props.theme.config.itemBorderSize}px solid green;
    width: ${props => props.theme.config.itemWidthSize}px;
    height: ${props => props.theme.config.itemWidthSize}px;
`;


interface PropsType {
    cell: CellType,
}

export const Item = observer((props: PropsType) => {
    const cell = props.cell;
    const value = cell.number.value;

    if (value === null) {
        return (
            <Wrapper>
                <ItemPossible cell={props.cell} />
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <ItemNumber number={value} cell={cell} />
        </Wrapper>
    );
});
