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
    ${props => {
        if (props.shouldShow) {
            return `
                background-color: #00ff0030;
                cursor: pointer;
            `;
        }

        return '';
    }}
`;

const WrapperOne = styled('div')`
    width: ${props => props.theme.config.itemWidth}px;
    height: ${props => props.theme.config.itemWidth}px;
`;

const ItemOnlyOne = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${props => props.theme.config.itemWidth}px;
    height: ${props => props.theme.config.itemWidth}px;
    background-color: #00ff00;
    font-size: 40px;
    color: blue;
    cursor: pointer;
`;

interface ItemPossiblePropsType {
    possible: PossibleValues,
    cell: CellType,
}

export const ItemPossible = observer((props: ItemPossiblePropsType) => {
    const { possible, cell } = props;

    const values = possible.values;
    const onlyOnePossible = values.length === 8;

    if (onlyOnePossible) {
        const out: Array<React.ReactNode> = [];
        iterateBySudokuValue((number) => {
            const shouldShow = !values.includes(number);
    
            if (shouldShow) {
                const onClick = () => {
                    cell.number.value = number;
                };
        
                out.push(
                    <ItemOnlyOne key={`id_${number}`} onClick={onClick}>{number}</ItemOnlyOne>
                );
            }
        });
    
        return (
            <WrapperOne>
                {out}
            </WrapperOne>
        );
    }

    const out: Array<React.ReactNode> = [];
    iterateBySudokuValue((number) => {
        const shouldShow = !values.includes(number);

        const onClick = () => {
            if (shouldShow) {
                cell.number.value = number;
            }
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
