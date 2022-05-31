import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styles from "./Todolist.module.css";

type PropsTasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsTodolistType = {
    title: string
    tasks: PropsTasksType []
    removeTasks: (removeID: string) => void
    addTasks: (title: string) => void
    changeIsDone: (id: string, isDone: boolean) => void

}

export const Todolist = (props: PropsTodolistType) => {

    const [filter, setFilter] = useState('All')

    let colander = props.tasks

    if (filter === 'Active') {
        colander = props.tasks.filter((el) => el.isDone === true)
    }

    if (filter === 'Completed') {
        colander = props.tasks.filter((el) => el.isDone === false)
    }
    const changeFilter = (filterValue: string) => {
        setFilter(filterValue)
    }


    let [title, setTitle] = useState('')


    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    let [error, setError] = useState(false)

    const addTasksHandler = () => {
        if (title.trim() !== '') {
            props.addTasks(title.trim())
            setTitle('')
        } else {
            setError(true)
        }
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (event.key === 'Enter') {
            addTasksHandler()
        }
    }

    const changeIsDoneHandler = (tID: string, isDone: boolean) => {
        props.changeIsDone(tID, isDone)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} className={error ? styles.error: ''}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>

                <button onClick={addTasksHandler}>+</button>
            </div>
            { error && <div className={styles.errorMessage}>Title is required</div>}

            <ul>
                {colander.map((el, index) => {
                    return (
                        <li key={el.id} className={el.isDone ? styles.isDone: ''}>
                            <button onClick={() => props.removeTasks(el.id)}>X</button>
                            <input type="checkbox" checked={el.isDone}
                                   onChange={(event) => changeIsDoneHandler(el.id, event.currentTarget.checked)}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button className={filter==='all' ? styles.activeFilter: ''} onClick={() => changeFilter('All')}>All</button>
                <button className={filter==='Active' ? styles.activeFilter: ''} onClick={() => changeFilter('Active')}>Active</button>
                <button className={filter==='Completed' ? styles.activeFilter: ''} onClick={() => changeFilter('Completed')}>Completed</button>
            </div>
        </div>
    )
}