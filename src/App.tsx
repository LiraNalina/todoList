import React, { useState } from "react";
import './App.css'
import { v1 } from "uuid";
import { TodoList } from "./TodoList";

export type SelectType = "all" | "done" | "to do"

type TaskListType = {
    id: string
    titleList: string
    select: SelectType
}

export const App = () => {

    function addTask(titleTask: string, todolistId: string) {
        let newTask = {
            id: v1(),
            titleTask: titleTask,
            isDone: false
        }
        let tasks = tasksObj[todolistId]
        let newTaskArray = [newTask, ...tasks]
        tasksObj[todolistId] = newTaskArray
        setTasks({...tasksObj})
        
    }

    function deleteTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let notDeletedTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = notDeletedTasks;
        setTasks({...tasksObj})
    }

    function changeIsDone(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
        
    }

    function selectWhichType(value: SelectType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.select = value;
            setTodoLists([...todolists])
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodoLists] = useState<TaskListType[]>([
        { id: todolistId1, titleList: "What to Learn", select: "to do" },
        { id: todolistId2, titleList: "What to Buy", select: "done" }

    ])

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            { id: v1(), titleTask: "html", isDone: true },
            { id: v1(), titleTask: "css", isDone: true },
            { id: v1(), titleTask: "react", isDone: false },
            { id: v1(), titleTask: "js", isDone: false }],
        [todolistId2]: [
            { id: v1(), titleTask: "milk", isDone: true },
            { id: v1(), titleTask: "apples", isDone: true },
            { id: v1(), titleTask: "cheese", isDone: false },
            { id: v1(), titleTask: "butter", isDone: false }]
    })

    return (
        <div className="App">
            {
                todolists.map((tl) => {

                    let typeOfTodolists = tasksObj[tl.id]

                    if (tl.select === "done") {
                        typeOfTodolists = typeOfTodolists.filter(t => t.isDone === true)
                    }
                    if (tl.select === "to do") {
                        typeOfTodolists = typeOfTodolists.filter(t => t.isDone === false)
                    }
                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        // titleTask={titleTask}
                        titleList={tl.titleList}
                        tasks={typeOfTodolists}
                        deleteTask={deleteTask}
                        addTask={addTask}
                        selectWhichType={selectWhichType}
                        changeIsDone={changeIsDone}
                        select={tl.select}
                    />
                })}

        </div>
    )
}

export default App
