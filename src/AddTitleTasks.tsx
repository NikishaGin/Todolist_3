import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";

type PropsAddTasksType = {
    callback:(title: string)=>void
}

export const AddTitleTasks = (props:PropsAddTasksType) => {

    let [title, setTitle] = useState("")

    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.callback(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    return (
        <div>
{/*            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />*/}
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                value={title}
                size="small"
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}/>
            {/*<button onClick={addTask}>+</button>*/}
            <Button variant="contained"
                    onClick={addTask} size="small"
                    style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}>+</Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}