import React, {useState} from 'react';
import { Text, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { AddIcon, CloseIcon, SunIcon, MoonIcon, ViewIcon } from '@chakra-ui/icons'
import { HStack, VStack } from '@chakra-ui/react'
import { Flex, Spacer, Center } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Switch
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'
  import { useColorMode } from '@chakra-ui/react';
  import { StackDivider } from '@chakra-ui/react';
  import { Checkbox } from '@chakra-ui/react';


interface ITodo {
    task: string;
    complete: boolean;
}

const Todo: React.FC = () => {
    const [taskName, setTaskName] = useState('');
    const [todo, setTodo] = useState<ITodo[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [modalTask, setModalTask] = useState('');
    const [index, setIndex] = useState(0);

    const { colorMode, toggleColorMode } = useColorMode()

    const handleInput = (input:string) => {
        setTaskName(input);
    }

    const handleClick = () => {
        if(taskName) {
            const newTask = {task: taskName, complete: false};
            setTodo([...todo, newTask]);
        }
    }

    const handleTaskComplete = (index: number) => {
        todo[index].complete = true;
        handleRemoveTask(index);
        onClose();
    }

    const handleRemoveTask = (index: number) => {
        todo.splice(index,1);
        setTodo([...todo]);
    }

    const openModal = (index: number) => {
        setModalTask(todo[index].task);
        setIndex(index)
        console.log("index", index);
        console.log('TASK: ', modalTask);
        onOpen();
    }


    return (
        <>
        <VStack
            spacing={4}
            align='stretch'
            padding="8"
        >  
            <VStack align={'left'} spacing='0' borderBottom={'1px solid gray'} paddingBottom={3}>
                <Flex>
                    <Text fontSize='4xl'>Daily Tasks</Text>
                    <Spacer/>
                    <Button onClick={toggleColorMode}>
                        {colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
                    </Button>
                </Flex>
                <Text fontSize='xs' color='Gray'>@Thu 13</Text>
            </VStack>

            <HStack>
                <InputGroup width={300}>
                    <Input placeholder="Add task" onChange={e => handleInput(e.target.value)}/>
                    <InputRightElement children={<AddIcon boxSize={3} onClick={handleClick}/>}/>
                </InputGroup>
            </HStack>
                
            {todo.map((item,index) => (
                <HStack paddingLeft={0} key={index}>
                    <Flex width={247} maxWidth={247}>
                        <Checkbox>{item.task}</Checkbox>
                        <Spacer/>
                        {/* <Center paddingRight={2}><ViewIcon onClick={() => openModal(index)}/></Center> */}
                        {/* <Center><CloseIcon boxSize={3} onClick={() => handleRemoveTask(index)}/></Center> */}
                    </Flex>
                </HStack>   
            ))}

                    <Modal size='full' isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing='30px'>
                            <Text fontSize='xl'>Focused task:</Text>
                            <Text fontSize='3xl'>{modalTask}</Text>
                            <Text fontSize='xs'>You might get overwhelmed by seeing all the other tasks, just focus on this task. You got this!</Text>  
                            <Button colorScheme='green' mr={3} onClick={() => {
                            handleTaskComplete(index);
                        }}>
                            Complete task
                        </Button> 
                        </VStack>
                    </ModalBody>
                    </ModalContent>
                </Modal>
    
        </VStack>
       
        </>
    );
};

export default Todo;