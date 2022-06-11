import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsEditableSpanType = {
    title: string
    callback:(newTitle:string)=>void
}

export const EditableSpan = (props: PropsEditableSpanType) => {
    let [newTitle, setNewTitle] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.callback(newTitle)
    }

    let [edit, setEdit] = useState(false)

    const EditHandler = () => {
        setEdit(!edit)
        addTask()
    }

    return (
        edit
            ? <input onBlur={EditHandler} onChange={onChangeHandler} autoFocus type='text' value={newTitle}/>
            : <span onDoubleClick={EditHandler}>{props.title}</span>

    )
}