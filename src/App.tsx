/*import React, {useState} from "react";
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./TodoList";
import {AddListForm} from "./AddListForm";

export type FilterType = "all" | "active" | "completed"

export type TaskType = {
    taskId: string
    taskTitle: string
    check: boolean
}

export type ListType = {
    listId: string
    listTitle: string
    filter: FilterType
}

export type StateType = {
    [key: string]: TaskType[]

}

const App = () => {

    let listId1 = v1()
    let listId2 = v1()

    let [lists, setLists] = useState<ListType[]>([
        {listId: listId1, listTitle: "Shopping", filter: "all"},
        {listId: listId2, listTitle: "House Cleaning", filter: "all"},
    ])

    let [tasks, setTasks] = useState<StateType>({
        [listId1]: [
            {taskId: v1(), taskTitle: "Milk", check: true},
            {taskId: v1(), taskTitle: "Bread", check: true},
            {taskId: v1(), taskTitle: "Water", check: false},
            {taskId: v1(), taskTitle: "Fruits", check: false},
            {taskId: v1(), taskTitle: "Vegetables", check: false},
        ],
        [listId2]: [
            {taskId: v1(), taskTitle: "Wash Clothes", check: true},
            {taskId: v1(), taskTitle: "Make Dinner", check: true},
            {taskId: v1(), taskTitle: "Water flowers", check: false},
            {taskId: v1(), taskTitle: "Make Salad", check: false},
            {taskId: v1(), taskTitle: "Do homework", check: false},
        ]
    })

    function chooseFilterType(selectedId: string, value: FilterType) {
        setLists(lists.map(l => l.listId === selectedId ? {...l, filter: value} : l))
    }

    function addTask(selectedId: string, newTitle: string) {
        let newItem = {
            taskId: v1(),
            taskTitle: newTitle,
            check: false
        }
        let copy = tasks[selectedId]
        tasks[selectedId] = [newItem, ...copy]

        setTasks({...tasks})
    }

    function deleteTask(selectedId: string, listId: string) {
        let copy = tasks[listId]
        tasks[listId] = copy.filter(c => c.taskId !== selectedId)
        setTasks({...tasks})
    }

    function checkUnchecked(selectedId: string, checked: boolean, listId: string) {
        tasks[listId] = tasks[listId].map(t =>
            t.taskId === selectedId ? {...t, check: checked} : t
        )
        setTasks({...tasks})
    }

    function changeTaskName(selectedId: string, newTaskName: string, listId: string) {
        tasks[listId] = tasks[listId].map(t => t.taskId === selectedId ? {...t, taskName: newTaskName} : t)
        setTasks({...tasks})
    }



    function addList(newListTitle: string) {
        let newListId = v1()
        let newList: ListType = {
            listId: newListId,
            listTitle: newListTitle,
            filter: "all"
        }
        setLists([...lists, newList])

        setTasks({...tasks, [newListId]: [
                {taskId: v1(), taskTitle: "Milk", check: true},
                {taskId: v1(), taskTitle: "Bread", check: true},
                {taskId: v1(), taskTitle: "Water", check: false},
                {taskId: v1(), taskTitle: "Fruits", check: false},
                {taskId: v1(), taskTitle: "Vegetables", check: false},
            ]})
    }

    const deleteList = (selectedId: string) => {
        lists = lists.filter(l => l.listId !== selectedId)
        setLists([...lists])
    }

    return (
        <div className="App">

            <AddListForm addList={addList} />

            {
                lists.map(list => {
                    let copy = tasks[list.listId]

                    if (list.filter === "active") {
                        copy = copy.filter(c => c.check === false)
                    }
                    if (list.filter === "completed") {
                        copy = copy.filter(c => c.check === true)
                    }

                    return <TodoList
                        tasks={copy}
                        listsName={list.listTitle}
                        addTask={addTask}
                        listId={list.listId}
                        deleteTask={deleteTask}
                        checkUnchecked={checkUnchecked}
                        chooseFilterType={chooseFilterType}
                        filter={list.filter}
                        deleteList={deleteList}/>
                })
            }
        </div>
    )
}

export default App*/


import React, {useState} from "react";
import './App.css'
import {v1} from "uuid";
import {TodoList} from "./TodoList";
import {AddListForm} from "./AddListForm";

export type FilterType = "all" | "completed" | "active"

export type TasksType = {
    taskId: string
    taskTitle: string
    check: boolean
}

export type ListsType = {
    listId: string
    listTitle: string
    filter: FilterType
}

export type StateType = {
    [key: string]: TasksType[]
}

const App = () => {

    let listId1 = v1()
    let listId2 = v1()

    let [lists, setLists] = useState<ListsType[]>([
        {listId: listId1, listTitle: "Shopping", filter: "all"},
        {listId: listId2, listTitle: "House Cleaning", filter: "all"},
    ])

    let [tasks, setTasks] = useState<StateType>({
        [listId1]: [
            {taskId: v1(), taskTitle: "Milk", check: true},
            {taskId: v1(), taskTitle: "Bread", check: true},
            {taskId: v1(), taskTitle: "Water", check: false},
            {taskId: v1(), taskTitle: "Fruits", check: false},
            {taskId: v1(), taskTitle: "Vegetables", check: false},
        ],
        [listId2]: [
            {taskId: v1(), taskTitle: "Wash Clothes", check: true},
            {taskId: v1(), taskTitle: "Make Dinner", check: true},
            {taskId: v1(), taskTitle: "Water flowers", check: false},
            {taskId: v1(), taskTitle: "Make Salad", check: false},
            {taskId: v1(), taskTitle: "Do homework", check: false},
        ]
    })

    function choosingFilterType(selectedId: string, value: FilterType) {
        setLists(lists.map(list => list.listId === selectedId ? {...list, filter: value} : list))
    }

    function checkedUnchecked(selectedId: string, listId: string, checked: boolean) {
        tasks[listId] = tasks[listId].map(t => t.taskId === selectedId ? {...t, check: checked} : t)
        setTasks({...tasks})
    }

    function addTask(selectedId: string, taskTitle: string) {
        let newTask: TasksType = {
            taskId: v1(),
            taskTitle: taskTitle,
            check: false
        }
        let copy = tasks[selectedId]
        tasks[selectedId] = [newTask, ...copy]
        setTasks({...tasks})
    }

    function deleteTask(selectedId: string, listId: string) {
        let copy = tasks[listId]
        tasks[listId] = copy.filter(c => c.taskId !== selectedId)
        setTasks({...tasks})
    }

    function addList(newName: string) {
        let newListId = v1()
        let newList: ListsType = {
            listId: newListId,
            listTitle: newName,
            filter: "all"
        }
        setLists([newList, ...lists])
        setTasks({
            ...tasks, [newListId]: [
                {taskId: v1(), taskTitle: "Milk", check: true},
                {taskId: v1(), taskTitle: "Bread", check: true},
                {taskId: v1(), taskTitle: "Water", check: false},
                {taskId: v1(), taskTitle: "Fruits", check: false},
                {taskId: v1(), taskTitle: "Vegetables", check: false},
            ]
        })
    }

    const deleteList = (selectedId: string) => {
        lists = lists.filter(l => l.listId !== selectedId)
        setLists([...lists])
        console.log(selectedId)
    }

    return (
        <div className="App">

            <AddListForm addList={addList}/>

            {lists.map(list => {

                let copy = tasks[list.listId]

                if (list.filter === "active") {
                    copy = copy.filter(c => c.check === false)
                }
                if (list.filter === "completed") {
                    copy = copy.filter(c => c.check === true)
                }


                return <TodoList
                    tasks={copy}
                    listTitle={list.listTitle}
                    addTask={addTask}
                    listId={list.listId}
                    deleteTask={deleteTask}
                    choosingFilterType={choosingFilterType}
                    filter={list.filter}
                    checkedUnchecked={checkedUnchecked}
                    deleteList={deleteList}/>
            })}

        </div>
    )
}

export default App
