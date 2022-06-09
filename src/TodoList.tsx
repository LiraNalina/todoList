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
    tasks: TaskType[]
    deleteTask: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    selectWhichType: (value: SelectType, todolistId: string) => void
    changeIsDone: (taskId: string, isDone: boolean, todolistId: string) => void
    select: SelectType
    deleteTodoL: (todolistId: string) => void
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

    /* const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            onClickNewTaskHandler();
        }
    } */

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") { onClickNewTaskHandler() }
    }

    const onDeleteHandler = (id: string) => {
        props.deleteTask(id, props.id)
    }

    const deleteTododList = () => {
        props.deleteTodoL(props.id)
    }


    return (
        <div>
            <h2>{props.titleList} <button onClick={deleteTododList}>x</button></h2>
            <input
                value={newTaskName}
                className={error ? "error" : ""}
                onChange={onNewTaskInputHandler}
                onKeyDown={onKeyDown} />

            <button onClick={onClickNewTaskHandler}>add</button>

            {error && <div className="error-message">{error}</div>}

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
                                        onKeyDown={onKeyDown}
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

