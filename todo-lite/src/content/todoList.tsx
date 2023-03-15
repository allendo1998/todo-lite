import React, {useState, useEffect} from 'react';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { green, orange, red } from '@mui/material/colors';
import { Select, MenuItem, Grid, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

enum Priority {
    green,
    orange,
    red
} 

interface ITodo {
    task: String;
    complete: boolean;
    priority: Priority;
}

const Todo: React.FC = () => {

    const [taskName, setTaskName] = useState('');
    const [todo, setTodo] = useState<ITodo[]>([]);
    const [priority, setPriority] = useState<Priority>(Priority.green);
    const [completion, setCompletion] = useState(0);


    const handleInput = (input:string) => {
        setTaskName(input);
    }

    const handleClick = () => {
        if(taskName) {
            const newTask = {task: taskName, complete: false, priority: priority};
            setTodo([...todo, newTask]);
        }
    }

    const selectPriority = (priority: Priority) => {
        setPriority(priority);
    }

    const handleTaskComplete = (index: number) => {
        let complete = todo[index].complete;
        if(complete === false){
            todo[index].complete = true;
        } else {
            todo[index].complete = false;
        }
        setTodo([...todo]);
    }

    const handleRemoveTask = (index: number) => {
        todo.splice(index,1);
        setTodo([...todo]);
    }

    useEffect(() => {
        let numberOfTasks = todo.length;
        let percentage = 0;
        if(numberOfTasks !== 0 ){
            let numberOfCompletedItems = 0;
            for(let i = 0; i < numberOfTasks; i++) {
                if(todo[i].complete === true) {
                    numberOfCompletedItems += 1;
                }
            }
            percentage = (numberOfCompletedItems/numberOfTasks) * 100;
        }
        setCompletion(percentage);
    }, [todo]);

    return (
        <>
            <Typography variant="h4">Todo List</Typography>
            <TableContainer>
                <Table size="small" aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{borderBottom: "none"}} width="1%">
                                <Select
                                size="small"
                                value={priority}
                                onChange={event => setPriority(event.target.value as Priority)}
                                >
                                    <MenuItem value={Priority.green}><CheckBoxOutlineBlankRoundedIcon fontSize="small" sx={{ color: green[500] }}/></MenuItem>
                                    <MenuItem value={Priority.orange}><CheckBoxOutlineBlankRoundedIcon fontSize="small" sx={{ color: orange[500] }}/></MenuItem>
                                    <MenuItem value={Priority.red}><CheckBoxOutlineBlankRoundedIcon fontSize="small" sx={{ color: red[500] }}/></MenuItem>
                            </Select>
                            </TableCell>
                            <TableCell sx={{borderBottom: "none"}} ><TextField sx = {{width: '65%'}}variant="standard" placeholder="Add a task" onChange={e => handleInput(e.target.value)}/></TableCell>
                            <TableCell sx={{borderBottom: "none"}} ><AddIcon fontSize="small" onClick={handleClick}/></TableCell>
                        </TableRow>
                    {todo.map((item,index) => (
                        <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell width="1%" sx={{borderBottom: "none"}} component="th" scope="row" onClick={() => handleTaskComplete(index)} align="left">
                            {item.priority === Priority.green && item.complete === false && <CheckBoxOutlineBlankRoundedIcon fontSize="small" sx={{ color: green[500] }}/> }
                            {item.priority === Priority.orange && item.complete === false && <CheckBoxOutlineBlankRoundedIcon fontSize="small" sx={{ color: orange[500] }}/> }
                            {item.priority === Priority.red && item.complete === false &&  <CheckBoxOutlineBlankRoundedIcon fontSize="small" sx={{ color: red[500] }}/> }

                            {item.priority === Priority.green && item.complete === true && <CheckBoxOutlinedIcon fontSize="small" sx={{ color: green[500] }}/> }
                            {item.priority === Priority.orange && item.complete === true && <CheckBoxOutlinedIcon fontSize="small" sx={{ color: orange[500] }}/> }
                            {item.priority === Priority.red && item.complete === true &&  <CheckBoxOutlinedIcon fontSize="small" sx={{ color: red[500] }}/> }
                        </TableCell>
                        <TableCell sx={{borderBottom: "none"}} align="left" onClick={() => handleTaskComplete(index)}>{item.task}</TableCell>
                        <TableCell sx={{borderBottom: "none"}} align="right">{<CloseIcon fontSize="small" onClick={() => handleRemoveTask(index)}/>}</TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell sx={{borderBottom: "none"}}/>
                        <TableCell sx={{borderBottom: "none"}} />
                        <TableCell sx={{borderBottom: "none"}}>
                            <Typography variant="caption">{completion}%</Typography>
                        </TableCell>
                    </TableRow>


                    </TableBody>
                </Table>
            </TableContainer>
    </>
    );
};

export default Todo;