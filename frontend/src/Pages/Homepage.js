import React from "react";
import { Container, Box, Text, Tabs, TabPanel, TabPanels, Tab, TabList } from "@chakra-ui/react";
import Login from "../components/Authentication/login";
import SignUp from "../components/Authentication/signUp";
const HomePage = () =>{
  return <Container maxW="xl" >
        <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          Chat app
        </Text>

      </Box>
      <Box bg="white" w="100%" p={4} color="black" borderRadius="lg" borderWidth="1px">
  <Tabs variant="soft-rounded" colorScheme="green">
  <TabList>
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Sign up</Tab>

  </TabList>

  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
      <SignUp/>
    </TabPanel>
  </TabPanels>
</Tabs></Box>
  </Container>
}

export default HomePage;