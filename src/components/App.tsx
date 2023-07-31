import { Center, Container, Divider, Text, Button, Loader, Alert } from "@mantine/core";
import { IconAlertCircle, IconRefresh } from "@tabler/icons-react";
import { useState } from "react";

import axios from "axios";

import Header from "./Header";
import AmountToConvertBox from "./AmountToConvertBox";
import CurrencySelectBox from "./CurrencySelectBox";

import '../styles/App.scss';

const apiKey: string = '657460b2307c53a79bc5f8ad';

const App: React.FC = () => {
    const [amountToConvert, setAmountToConvert] = useState(1);
    const [fromCountryValue, setFromCountryValue] = useState('USD');

    const [toCountryValue, setToCountryValue] = useState('GBP');
    const [totalExchangeRate, setTotalExchangeRate] = useState('');

    const [isLoading, setLoadingState] = useState(false);
    const [errorData, setErrorData]: any = useState({});

    // ALERT CLOSE BUTTON FUNCTION
    const AlertCloseButtonClicked = () => {
        setErrorData({});
    }

    // CONVERT AMOUNT INTO TARGET CURRENCY
    const GetExchangeRate = async () => {
        setErrorData({}); // RESET ERROR MESSAGE
        setTotalExchangeRate(''); // RESET EXCHANGE RATE

        // SANITY CHECKS
        if (!fromCountryValue || fromCountryValue === '' || !toCountryValue || toCountryValue === '') {
            setErrorData({ message: 'One of the country boxes is blank! Please choose a country!' });
            return;
        }

        // ENABLE LOAD SPINNER
        setLoadingState(true);

        // GET EXCHANGE RATE THROUGH API REQUEST
        await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCountryValue}`).then(response => {
            const calculatedRate = (amountToConvert * response?.data?.conversion_rates[toCountryValue]).toFixed(2);
            setTotalExchangeRate(`${amountToConvert} ${fromCountryValue} = ${calculatedRate} ${toCountryValue}`);
        }).catch(error => {
            if (error && typeof error === 'object' && error.code && error.message) {
                setErrorData({ message: `(${error.code}) ${error.message}` });
            }
        });

        // DISABLE LOAD SPINNER
        setLoadingState(false);
    }

    // RETURN ELEMENT
    return (
        <Center id="outercontainer" p={30} pt={20} pb={20} maw={450} mx="auto">
            <Container id="innercontainer">
                {errorData?.message && 
                    <Alert
                        id="alert"
                        icon={<IconAlertCircle size="1rem" />}
                        title="Error"
                        color="red"
                        radius="lg"
                        variant="outline"
                        mb={30}
                        withCloseButton
                        onClose={AlertCloseButtonClicked}
                    >
                        <Text id="text" fz="sm">{errorData?.message ?? 'Unknown Error'}</Text>
                    </Alert>
                }

                <Header />
                <Divider mt={30} mb={20} opacity='30%' />

                <AmountToConvertBox value={amountToConvert} oninput={setAmountToConvert} />
                <CurrencySelectBox conversion="From" value={fromCountryValue} onchange={setFromCountryValue} />

                <Divider mt={30} mb={20} opacity='30%' />
                <CurrencySelectBox conversion="To" value={toCountryValue} onchange={setToCountryValue} />

                {totalExchangeRate !== '' && 
                    <Container id="exchangerate_container" mt={25}>
                        <Text id="exchangerate" fz="lg" color="white">{totalExchangeRate}</Text>
                    </Container>
                }

                <Center id="getexchangeratebutton_container" mt={25}>
                    <Button
                        id="getexchangeratebutton"
                        variant="outline"
                        color="lime"
                        size="md"
                        sx={{ transition: '.1s' }}
                        aria-label="Convert Amount"
                        leftIcon={<IconRefresh size="1rem" />}
                        onClick={GetExchangeRate}
                    >
                        Get Exchange Rate
                    </Button>

                    {isLoading && <Loader ml={30} />}
                </Center>
            </Container>
        </Center>
    )
}

export default App;
