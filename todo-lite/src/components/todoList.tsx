import {useState} from 'react';
import { CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'
import { Box, Text, Input, InputGroup, HStack, VStack, Flex, Spacer, Button, useColorMode, Checkbox, Center} from '@chakra-ui/react'
import { motion } from "framer-motion";

interface ITodo {
    id: number;
    task: string;
    complete: boolean;
}

function Todo() {
    const [todo, setTodo] = useState<ITodo[]>([]);
    const [input, setInput] = useState("");
    const { colorMode, toggleColorMode } = useColorMode()
    const daysOfWeek = ['Sund', 'Mon', 'Tue', 'Wedn', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const dayName = daysOfWeek[today.getDay()];
    const date = today.getDate();

    function addTodo() {
        if (input) {
            const newTodo: ITodo = {
                id: Date.now(),
                task: input,
                complete: false,
            }
            setTodo([...todo, newTodo]);
            setInput("");
        }
    }

    function removeTodo(todoId: number) {
        setTodo(todo.filter((todo) => todo.id !== todoId));
    }

    function completeTodo(todoId: number) {
        setTodo(
          todo.map((todo) =>
            todo.id === todoId ? { ...todo, complete: !todo.complete } : todo
          )
        );
      }
    

    return (
        <VStack
            spacing={4}
            align='stretch'
            padding="8"
        >  
            <VStack align={'left'} spacing='0' borderBottom={'1px solid gray'} paddingBottom={5}>
                <Flex>
                    <Text fontSize='4xl'>Daily Tasks</Text>
                    <Spacer/>
                    <Button onClick={toggleColorMode}>
                        {colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
                    </Button>
                </Flex>
                <Text fontSize='md' color='Gray'>@{dayName} {date}</Text>
            </VStack>

            <HStack>     
                <InputGroup width={350}>
                    <Input 
                        size="md" 
                        variant="unstyled" 
                        placeholder="Add task" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={ e => { if(e.key === 'Enter') addTodo() }}
                    />
                </InputGroup>
            </HStack>

            <Box h="380px" overflowY={'auto'} paddingRight={2}>
            {todo.map((todo) => (
                <HStack key={todo.id} >
                    <Flex width={345} maxWidth={345}>
                    <Checkbox
                        size='md'
                        isChecked={todo.complete}
                        onChange={() => completeTodo(todo.id)}
                        textDecoration={todo.complete ? "line-through" : "none"}
                        opacity={todo.complete ? 0.5 : 1}
                        wordBreak="break-word"
                    >
                        {todo.task}
                    </Checkbox>
                    <Spacer/>
                    {todo.complete && 
                    <Center>
                         <motion.div
                            onClick={() => removeTodo(todo.id)}
                            whileHover={{ scale: 1.2, rotate: 30 }}
                        >
                        <CloseIcon boxSize={3} onClick={() => removeTodo(todo.id)}/>
                        </motion.div>
                    </Center>
                    } 
                    </Flex> 
            </HStack>
            ))}   
            </Box>
        </VStack>
    );
};

export default Todo;