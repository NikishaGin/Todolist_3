import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

function App() {

    let [ tasks1, setTasks1] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true},
        { id: v1(), title: "JS", isDone: true},
        { id: v1(), title: "ReactJS", isDone: false},
        { id: v1(), title: "ReactJS", isDone: true},
        { id: v1(), title: "ReactJS", isDone: false}
    ])

    const removeTasks = (removeID:string) => {
         setTasks1(tasks1.filter((el)=>el.id !==removeID))
    }

    const addTasks = (title:string) => {
        setTasks1([{ id: v1(), title: title, isDone: true},...tasks1])
    }

    const changeIsDone = (id: string,isDone: boolean)=> {
        setTasks1(tasks1.map(el=>el.id===id ? {...el,isDone:isDone} :el))
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasks1}
                      removeTasks = {removeTasks}
                      addTasks = {addTasks}
                      changeIsDone={changeIsDone}/>

        </div>
    );
}

export default App;
