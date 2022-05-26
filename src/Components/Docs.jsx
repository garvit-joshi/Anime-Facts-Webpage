import { Box, Code, Text, Button, Tag, Divider } from "@chakra-ui/react";
import {
    ListItem,
    OrderedList,
    } from '@chakra-ui/react';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

const Docs = () => {

    //! API_URL variable
    let API_URL;

    //! Set API_URL based on env
                    
    if(process.env.NODE_ENV !== 'production') {
        API_URL=process.env.REACT_APP_DEV_API_URL;
    }
    else{
        API_URL=process.env.REACT_APP_PROD_API_URL;
    }

    const toast = useToast();

    function handleCopyUrl(url) {
        navigator.clipboard.writeText(url);
        toast({
            description: "Copied successfully.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    return (
        <Box>

            <Box>
                <Text fontSize="lg" fontWeight="500" mt="8">
                    Base URL for API 
                </Text>
                <Code fontSize="lg">{API_URL}</Code>
                <Button display="block" colorScheme="red" size="md" mt="2"
                onClick={() => handleCopyUrl(API_URL)}>
                    Copy
                </Button>
            </Box>

            <Divider my="4" />

            <Box mt="12">
                <Text fontSize="lg" fontWeight="500">
                    Get All Anime Facts
                    <Tag ml="3" size="lg" variant='solid' colorScheme="teal">GET</Tag>
                </Text>
                <Code mt="3" fontSize="lg">{`${API_URL}/facts`}</Code>
                <Button colorScheme="red" size="md" display="block" mt="2"
                onClick={() => handleCopyUrl(API_URL+"/facts")}>
                    Copy
                </Button>
                <Text mt="3">
                The above end point fetches all the anime facts. It will return 10 facts
                per page. Number of facts returned can be customized by passing size and
                page as query. 
                </Text>

                <Text mt="4" fontWeight="500">
                    Headers
                </Text>
                <Text>
                <Code mt="2" colorScheme='red' children="apiKey" mr="5px" />
                - API Key (required)
                </Text>

                <Text mt="4" fontWeight="500">Query Parameters</Text>
                <OrderedList>
                    <ListItem mt="2">
                        <Code colorScheme='red' children="anime" mr="5px" />
                        - (String) name of anime
                    </ListItem>
                    <ListItem mt="2">
                        <Code colorScheme='red' children="topic" mr="5px" />
                        - (String) name of character, location, name etc.
                    </ListItem>
                    <ListItem mt="2">
                        <Code colorScheme='red' children="size" mr="14px" />
                        - (Integer) number of facts per page.
                    </ListItem>
                    <ListItem mt="2">
                        <Code colorScheme='red' children="page" mr="14px" />
                        - (Integer) to access a particular page.
                    </ListItem>
                </OrderedList>
            </Box>

            <Divider my="4" />

            <Box mt="12">
                <Text fontSize="lg" fontWeight="500">
                    Get Random Anime Facts
                    <Tag ml="3" size="lg" variant='solid' colorScheme="teal">GET</Tag>
                </Text>
                <Code mt="3" fontSize="lg">{`${API_URL}/facts/random`}</Code>
                <Button display="block" colorScheme="red" size="md" mt="2"
                onClick={() => handleCopyUrl(API_URL+"/facts/random")}>
                    Copy
                </Button>
                <Text mt="3">
                The above end point fetches anime facts and return a random anime fact. 
                </Text>
                <Text mt="4" fontWeight="500">
                    Headers
                </Text>
                <Text>
                <Code mt="2" colorScheme='red' children="apiKey" mr="5px" />
                - API Key (required)
                </Text>
            </Box>

            <Divider my="4" />

            <Box mt="12">
                <Text fontSize="lg" fontWeight="500" mt="8">
                    Get Anime Fact By Id
                    <Tag ml="3" size="lg" variant='solid' colorScheme="teal">GET</Tag>
                </Text>
                <Code mt="3" fontSize="lg">{`${API_URL}/facts/:id`}</Code>
                <Button display="block" colorScheme="red" size="md" mt="2"
                onClick={() => handleCopyUrl(API_URL+"/facts/:id")}>
                    Copy
                </Button>
                <Text mt="3">
                The above end point fetche the anime fact with the mentioned id which needs
                to be passed as a parameter. 
                </Text>
                <Text mt="4" fontWeight="500">
                    Headers
                </Text>
                <Text>
                <Code mt="2" colorScheme='red' children="apiKey" mr="5px" />
                - API Key (required)
                </Text>
                <Text mt="4" fontWeight="500">
                    Parameter
                </Text>
                <Text>
                <Code mt="2" colorScheme='red' children="id" mr="5px" />
                - Id of the anime fact (required)
                </Text>
            </Box>  

            <Divider my="4"/>

            <Box mt="12">
                <Text fontSize="lg" fontWeight="500" mt="8">Responses</Text>

                <Alert mt="2" status='success'>
                    <AlertIcon />
                    200 - Ok
                </Alert>

                <Alert mt="2" status='error'>
                    <AlertIcon />
                    401 - Unauthorized request
                </Alert>

                <Alert mt="2" status='error'>
                    <AlertIcon />
                    500 - Internal server error
                </Alert>
            </Box>     

        </Box>
    );
}
 
export default Docs;