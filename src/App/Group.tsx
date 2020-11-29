import { observer } from "mobx-react";
import styled from '@emotion/styled';
import { Item } from './Item';
import { SudokuSquare } from "src/AppState/SudokuSquare";
import { CellType as CellType } from "src/AppState/AppState";

const Wrapper = styled('div')`
    border: ${props => props.theme.config.groupBorderSize}px solid black;

    width: ${props => props.theme.config.groupWidthSize}px;
    height: ${props => props.theme.config.groupWidthSize}px;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    flex-shrink: 0;
`;

interface PropsType {
    square: SudokuSquare<CellType>
}

export const Group = observer((props: PropsType) => {
    const out: Array<React.ReactNode> = [];

    props.square.forEach((x, y, cell) => {
        out.push(
            <Item key={`${x}_${y}`} cell={cell}/>
        );
    });

    return (
        <Wrapper>
            {out}
        </Wrapper>
    );
});

