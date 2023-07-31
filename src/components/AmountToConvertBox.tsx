import { Container, TextInput } from '@mantine/core';
import { IconCurrencyDollar } from '@tabler/icons-react';

import '../styles/AmountToConvertBox.scss';

const AmountToConvertBox: React.FC<AmountToConvertProps> = (props: any) => {
    return (
        <Container id="amounttoconvert_container">
            <TextInput
                id="amounttoconvert"
                type='number'
                label="Amount"
                placeholder="Enter an amount"
                value={props.value}
                onChange={event => props.oninput(event.currentTarget.value)}
                icon={<IconCurrencyDollar size="1rem" />}
                aria-label="Amount"
                required
            />
        </Container>
    )
}

export default AmountToConvertBox;
