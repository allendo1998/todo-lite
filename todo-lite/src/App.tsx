import './App.css';
import Todo from './components/todoList';
import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/react'
import theme from './theme/theme'
import '@fontsource/inter/600.css';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Todo/>
    </ChakraProvider>
  );
}

export default App;
