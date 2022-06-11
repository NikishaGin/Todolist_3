import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddTitleTasks} from "./AddTitleTasks";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolist, setTodolist] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const editTodolist = (todolistID: string, newTitle: string) => {
        setTodolist(todolist.map(el=>el.id===todolistID ? {...el,title:newTitle}:el))

    }

    const removeTodolist = (todolistID: string) => {
        setTodolist(todolist.filter(el => el.id !== todolistID))
    }


    function removeTask(todolistID: string, taskID: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID)})
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone} : el)})
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolist(todolist.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }


    const AddTodolist = (newTitle: string) => {
        let newID = v1()
        setTodolist([{id: newID, title: newTitle, filter: 'all'}, ...todolist])
        setTasks({...tasks, [newID]:
                [{id: v1(), title: 'Rest API', isDone: true},
                    {id: v1(), title: 'GraphQL', isDone: false},
                ]
        })
    }


    return (
        <div className="App">
            <AddTitleTasks callback={AddTodolist}/>
            {todolist.map((el) => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                return (
                    <Todolist
                        key={el.id}
                        todolistID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                        editTodolist={editTodolist}/>
                )
            })}
        </div>
    );
}

export default App;
