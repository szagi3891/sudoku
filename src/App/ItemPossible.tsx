import styled from "@emotion/styled";
import { observer } from "mobx-react";
import { CellType } from "src/AppState/AppState";
import { iterateBySudokuValue } from "src/AppState/NumberItem";
import { PossibleValues } from "src/AppState/PossibleValues";

const Wrapper = styled('div')`
    width: ${props => props.theme.config.itemWidth}px;
    height: ${props => props.theme.config.itemWidth}px;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    flex-shrink: 0;
`;

interface ItemPropsType {
    shouldShow: boolean,
}

const Item = styled('div')<ItemPropsType>`
    display: flex;
    align-items: center;
    justify-content: center;
    ${props => props.shouldShow ? `background-color: #00ff0030;`: ''}
    cursor: pointer;
`;

interface ItemPossiblePropsType {
    possible: PossibleValues,
    cell: CellType,
}

export const ItemPossible = observer((props: ItemPossiblePropsType) => {
    const { possible, cell } = props;

    const values = possible.values;

    const out: Array<React.ReactNode> = [];

    iterateBySudokuValue((number) => {
        const shouldShow = !values.includes(number);

        const onClick = () => {
            cell.number.value = number;
        };

        out.push(
            <Item key={`id_${number}`} shouldShow={shouldShow} onClick={onClick}>{shouldShow ? number : ''}</Item>
        );
    });

    return (
        <Wrapper>
            {out}
        </Wrapper>
    );
});
