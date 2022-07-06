/*import React, {ChangeEvent, useState} from "react";
import {FilterType, TaskType} from "./App";
import {AddListForm} from "./AddListForm";

export type ListsAndTasksPropsType = {
    tasks: TaskType[]
    listsName: string
    listId: string
    filter: FilterType
    chooseFilterType: (selectedId: string, value: FilterType) => void
    addTask: (selectedId: string, newTitle: string) => void
    deleteTask: (selectedId: string, listId: string) => void
    deleteList: (selectedId: string) => void
    checkUnchecked: (selectedId: string, checked: boolean, listId: string) => void
}

export const TodoList = (props: ListsAndTasksPropsType) => {

    const addTaskButton = (taskName: string) => {
        props.addTask(props.listId, taskName)
    }

    const deleteTaskButton= (selectedId: string) => {
        props.deleteTask(selectedId, props.listId)
    }

    const deleteListButton = () => {
        props.deleteList(props.listId)
    }

    return (
        <div>

            <h3>
                {props.listsName}
                <button onClick={deleteListButton}>x</button>
            </h3>

            <AddListForm addList={addTaskButton} />

            <ul>
                {props.tasks.map(t => {
                    const onChangeCheckInput = (e: ChangeEvent<HTMLInputElement>) => {
                        props.checkUnchecked(t.taskId, e.currentTarget.checked, props.listId)
                    }
                    return (
                        <div>
                            <li key={t.taskId}>
                                <input type="checkbox"
                                       checked={t.check}
                                       onChange={onChangeCheckInput}/>

                                <span>{t.taskTitle}</span>

                                <button onClick={() => {
                                    deleteTaskButton(t.taskId)
                                }}>x
                                </button>

                            </li>
                        </div>
                    )
                })}
            </ul>
            <button onClick={() => {props.chooseFilterType(props.listId, "all")}}>All</button>
            <button onClick={() => {props.chooseFilterType(props.listId, "completed")}}>Completed</button>
            <button onClick={() => {props.chooseFilterType(props.listId, "active")}}>Active</button>
        </div>
    )
}*/


import React, {ChangeEvent, useState} from "react";
import {FilterType, ListsType, TasksType} from "./App";
import {AddListForm} from "./AddListForm";

export type ListsAndTasksPropsType = {
    tasks: TasksType[]
    listTitle: string
    listId: string
    checkedUnchecked: (anyTaskId: string, listId: string, checked: boolean) => void
    filter: FilterType
    choosingFilterType: (anyListId: string, value: FilterType) => void
    addTask: (anyTaskId: string, taskTitle: string) => void
    deleteTask: (anyTaskId: string, listId: string) => void
    deleteList: (anyListId: string) => void
}

export const TodoList = (props: ListsAndTasksPropsType) => {

    const addTaskForEveryList = (taskName: string) => {
        props.addTask(props.listId, taskName)
    }

    const deleteTaskButton = (selectedId: string) => {
        props.deleteTask(selectedId, props.listId)
    }

    const deleteListButton = () => {
        props.deleteList(props.listId)
    }

    return (
        <div>
            <AddListForm addList={addTaskForEveryList}/>

            <h3>
                {props.listTitle}
                <button onClick={deleteListButton}>x</button>
            </h3>

            <ul>
                {props.tasks.map(t => {

                    const onChangeCheckedInput = (e: ChangeEvent<HTMLInputElement>) => {
                        props.checkedUnchecked(t.taskId, props.listId, e.currentTarget.checked)
                    }

                    return <li key={t.taskId}>
                        <input
                            type="checkbox"
                            checked={t.check}
                            onChange={onChangeCheckedInput}/>

                        <span>{t.taskTitle}</span>

                        <button onClick={() => {
                            deleteTaskButton(t.taskId)
                        }}>x
                        </button>

                    </li>
                })}
            </ul>

            <div>

                <button onClick={() => {
                    props.choosingFilterType(props.listId, "all")
                }}>All
                </button>
                <button onClick={() => {
                    props.choosingFilterType(props.listId, "active")
                }}>Active
                </button>
                <button onClick={() => {
                    props.choosingFilterType(props.listId, "completed")
                }}>Completed
                </button>

            </div>
        </div>
    )
}













