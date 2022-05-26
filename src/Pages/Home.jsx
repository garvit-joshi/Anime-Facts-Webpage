import { useState, useEffect } from 'react';
import { Box, 
    Container, 
    Spinner,
    Text, 
    Input, 
    InputRightElement,
    InputGroup, Button } from '@chakra-ui/react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    InputLeftAddon } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import Appbar from '../Components/Appbar';
import Docs from '../Components/Docs';

const Home = () => {

    //! API_URL variable
    let API_URL;

    //! Set API_URL based on env
                
    if(process.env.NODE_ENV !== 'production') {
        API_URL=process.env.REACT_APP_DEV_API_URL;
    }
    else{
        API_URL=process.env.REACT_APP_PROD_API_URL;
    }

    const TOKEN = JSON.parse(localStorage.getItem("anime-facts-jwt-token"));

    const toast = useToast();

    // ! States
    const [currentUser, setCurrentUser] = useState(false);
    const [email, setEmail] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [apiKeyShow, setApiKeyShow] = useState(false);
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        if(localStorage.getItem("anime-facts-jwt-token")) {
            setCurrentUser(true);
        }

        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${TOKEN}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`${API_URL}/users/user/data`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            // console.log(result);
            if(result.status === "success") {
                setEmail(result.data.email);
                setApiKey(result.data.apiKey);
            }
        })
        .catch((error) => {
            console.log('error', error);
        });
    },[apiKey])

    // ! Function to handle show and hide API KEY, Chakra UI
    const handleShowApiKey = () => setApiKeyShow(!apiKeyShow);

    // ! Generate new API Key
    function handleGenerateAPIKey() {
        setSpinner(true);
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${TOKEN}`);

        let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`${API_URL}/users/generate/apikey`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            // console.log(result);
            if(result.status === "success") {
                setApiKey(result.data.apiKey);
                setSpinner(false);
                toast({
                    title: 'Successfull.',
                    description: "API Key generated successfully.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            }
            else {
                setSpinner(false);
                toast({
                    title: 'Failed to generate API Key.',
                    description: result.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
        })
        .catch((error) => {
            // console.log('error', error);
            setSpinner(false);
            toast({
                title: 'Failed to generate API Key.',
                description: "Something went wrong. Try again.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        });
    }

    // ! Function to handle copy
    function handleCopy(e) {
        e.preventDefault();
        navigator.clipboard.writeText(apiKey);
        toast({
            title: 'Copied !!',
            description: "API key copied successfully.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    return (
        <Box pb="12">
            <Appbar/>
            <Container maxW="container.xl">

            <Text mt="10" mb="10" fontSize="2xl" fontWeight="500">
                Documentation and Basic Info.
            </Text>

            <Accordion defaultIndex={[1]} allowMultiple>

                {currentUser &&
                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box py="2" flex='1' fontSize="lg" fontWeight="500" textAlign='left'>
                        Settings - Profile and API key
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <InputGroup mt="4">
                            <InputLeftAddon children='Email' />
                            <Input type='email' disabled={true} defaultValue={email} />
                        </InputGroup>

                        <InputGroup mt="4">
                            <InputLeftAddon children='API Key' />
                            <Input type={apiKeyShow ? 'text' : 'password'} disabled={true} defaultValue={apiKey} />
                            <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleShowApiKey}>
                            {apiKeyShow ? 'Hide' : 'Show'}
                            </Button>
                            </InputRightElement>
                        </InputGroup>

                        <Button onClick={handleGenerateAPIKey} mt="3" mb="4" colorScheme='red' size='md'>
                            Generate API Key 
                            {spinner &&
                            <Spinner ml="4" />}
                        </Button>

                        <Button onClick={handleCopy} ml="4" mt="3" mb="4" colorScheme='gray' size='md'>
                            Copy API Key
                        </Button>

                    </AccordionPanel>
                </AccordionItem>}

                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box py="2" flex='1' fontSize="lg" fontWeight="500" textAlign='left'>
                        API Documentation Version 1.0
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Docs/>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            </Container>
        </Box>
    );
}
 
export default Home;