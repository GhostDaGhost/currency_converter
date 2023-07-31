interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    image: string;
    label: string;
    description: string;
}

interface SelectBoxProps {
    conversion: string;
    value: string;
    onchange: Function;
}

interface AmountToConvertProps {
    value: string | number;
    oninput: Function;
}
