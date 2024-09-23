
import React from "react";
import { VStack } from '@chakra-ui/react'
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";

const SignUp = () =>{
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  return <VStack spacing='5px'>
    <FormControl >
      <FormLabel>Name</FormLabel>
      <Input placeholder='Enter your name' onChange ={(e)=> setName(e.target.value)}/>
    </FormControl>
  </VStack>
}

export default SignUp

