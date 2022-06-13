import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddTitleTasks} from "./AddTitleTasks";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID:string, task:string) => void
    changeFilter: (todolistID:string,value: FilterValuesType) => void
    addTask: (todolistID:string,title: string) => void
    changeTaskStatus: (todolistID:string,taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist:(todolistID: string)=>void
    editTodolist:(todolistID: string, newTitle: string)=>void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.todolistID,"all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID,"active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID,"completed");

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    const addTasksHandler = (title:string) => {
        props.addTask(props.todolistID,title)
    }

    const editableSpanHandler = (newTitle: string) => {
        props.editTodolist(props.todolistID,newTitle)

    }

    return <div>
        <h3> <EditableSpan title={props.title} callback={editableSpanHandler}/>
        {/*<button onClick={removeTodolistHandler}>X</button>*/}
            <IconButton aria-label="delete">
                <Delete onClick={removeTodolistHandler} />
            </IconButton>


        </h3>
        <AddTitleTasks callback={addTasksHandler} />

        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID,t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID,t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*<input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>*/}
                        <Checkbox onChange={onChangeHandler}
                                  checked={t.isDone}  defaultChecked />
                        <span>{t.title}</span>
                        <IconButton aria-label="delete">
                            <Delete onClick={onClickHandler} />
                        </IconButton>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                    </li>
                })
            }
        </ul>
        <div>
{/*            <button className={props.filter === 'all' ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>*/}
            <Button variant= {props.filter === 'all' ? "contained" : "outlined"}  onClick={onAllClickHandler}>all</Button>
            <Button variant={props.filter === 'active' ? "contained" : "outlined"} onClick={onActiveClickHandler} color="success">active</Button>
            <Button variant={props.filter === 'completed' ? "contained" : "outlined"} onClick={onCompletedClickHandler} color="error">completed</Button>
        </div>
    </div>
}
