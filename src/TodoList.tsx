import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { SelectType } from "./App";

export type TaskType = {
    id: string
    titleTask: string
    isDone: boolean
}

export type TaskPropsType = {
    id: string
    titleList: string
    // titleTask: string
    tasks: TaskType[]
    deleteTask: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    selectWhichType: (value: SelectType, todolistId: string) => void
    changeIsDone: (taskId: string, isDone: boolean, todolistId: string) => void
    select: SelectType
}

export const TodoList = (props: TaskPropsType) => {

    const [newTaskName, setNewTaskName] = useState('')
    const [error, setError] = useState<string | null>(null)


    const onClickNewTaskHandler = () => {
        if (newTaskName.trim() !== "") {
            props.addTask(newTaskName, props.id)
            setNewTaskName("")
        } else {
            setError("Title is required")
        }
    }

    const onNewTaskInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskName(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            onClickNewTaskHandler();
        }
    }

    const onDeleteHandler = (id: string) => {
        props.deleteTask(id, props.id)
    }

    return (
        <div>
            <h2>{props.titleList}</h2>
            <input
                value={newTaskName}
                className={error ? "error" : ""}
                onChange={onNewTaskInputHandler}
                onKeyPress={onKeyPressHandler} />
            <button onClick={onClickNewTaskHandler}>add</button>
            {error && <div className="error-message">Field is required</div>}
            <ul>
                {
                    props.tasks.map(t => {
                        const onChangeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeIsDone(t.id, e.currentTarget.checked, props.id)
                        }
                        return (
                            <div>
                                <li className={t.isDone ? "is-done" : ""}
                                    key={t.id}>
                                    <input
                                        onChange={onChangeIsDoneHandler}
                                        type="checkbox"
                                        checked={t.isDone} />{t.titleTask}
                                    <button
                                        onClick={() => { onDeleteHandler(t.id) }}
                                    >x</button>
                                </li>
                            </div>
                        )
                    })
                }
            </ul>
            <button
                className={props.select === "all" ? "active-filter" : ""}
                onClick={() => { props.selectWhichType("all", props.id) }}>All</button>
            <button
                className={props.select === "done" ? "active-filter" : ""}
                onClick={() => { props.selectWhichType("done", props.id) }}>done</button>
            <button
                className={props.select === "to do" ? "active-filter" : ""}
                onClick={() => { props.selectWhichType("to do", props.id) }}>to do</button>

        </div>
    )
}
