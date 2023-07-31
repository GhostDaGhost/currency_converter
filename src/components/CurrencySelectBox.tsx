import { Avatar, Container, Group, Select, Text } from '@mantine/core';
import { countries } from '../data/consts';

import { forwardRef } from 'react';
import { IconFlagFilled } from '@tabler/icons-react';

const countriesForSelectElement: any[] = [];
for (let countryCode in countries) {
    countriesForSelectElement.push({
        image: `https://flagcdn.com/48x36/${countries[countryCode].toLowerCase()}.png`,
        label: countryCode,
        value: countryCode
    });
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, description, ...others }: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <Avatar src={image} />

                <div>
                    <Text>{label}</Text>
                </div>
            </Group>
        </div>
    )
);

const CurrencySelectBox: React.FC<SelectBoxProps> = (props: any) => {
    return (
        <Container mt={20}>
            <Select
                label={props.conversion}
                placeholder="Please choose a country"
                searchable
                nothingFound="No country found"
                itemComponent={SelectItem}
                onSearchChange={props.onchange}
                searchValue={props.value}
                data={countriesForSelectElement}
                icon={<IconFlagFilled size="1rem" />}
                aria-label={props.conversion}
                required
            />
        </Container>
    )
}

export default CurrencySelectBox;
