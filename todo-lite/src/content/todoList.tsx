import React, {useState, useEffect} from 'react';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { green, orange, red } from '@mui/material/colors';

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
        let numberOfCompletedItems = 0;
        for(let i = 0; i < numberOfTasks; i++) {
            if(todo[i].complete === true) {
                numberOfCompletedItems += 1;
            }
        }
        const percentage = (numberOfCompletedItems/numberOfTasks) * 100;
        setCompletion(percentage);
    }, [todo]);

    return (
        <div>
            <h1>Todo list</h1>
            <div>
                <div>
                    <CheckBoxOutlineBlankRoundedIcon fontSize="small" sx={{ color: green[500] }} onClick={() => selectPriority(Priority.green)}/>
                    <CheckBoxOutlineBlankRoundedIcon fontSize="small" sx={{ color: orange[500] }} onClick={() => selectPriority(Priority.orange)}/>
                    <CheckBoxOutlineBlankRoundedIcon fontSize="small" sx={{ color: red[500] }} onClick={() => selectPriority(Priority.red)}/>
                </div>
                <input 
                    placeholder={"Add task"}
                    onChange={e => handleInput(e.target.value)}/>
                    <AddIcon fontSize="small" onClick={handleClick}/>
            </div>
            <div>
                {todo.map((item,index) => 
                    <>
                        {item.priority === Priority.green && item.complete === false && <CheckBoxOutlineBlankRoundedIcon fontSize="small" sx={{ color: green[500] }}/> }
                        {item.priority === Priority.orange && item.complete === false && <CheckBoxOutlineBlankRoundedIcon fontSize="small" sx={{ color: orange[500] }}/> }
                        {item.priority === Priority.red && item.complete === false &&  <CheckBoxOutlineBlankRoundedIcon fontSize="small" sx={{ color: red[500] }}/> }

                        {item.priority === Priority.green && item.complete === true && <CheckBoxOutlinedIcon fontSize="small" sx={{ color: green[500] }}/> }
                        {item.priority === Priority.orange && item.complete === true && <CheckBoxOutlinedIcon fontSize="small" sx={{ color: orange[500] }}/> }
                        {item.priority === Priority.red && item.complete === true &&  <CheckBoxOutlinedIcon fontSize="small" sx={{ color: red[500] }}/> }

                        <p onClick={() => handleTaskComplete(index)} key={index}>{item.task}</p>
                        <CloseIcon fontSize="small" onClick={() => handleRemoveTask(index)}/>
                    </>
                
                )}
            </div>
            <div>
                <p>{completion}%</p>
            </div>
    </div>
    );
};

export default Todo;