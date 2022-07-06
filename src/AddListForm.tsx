/*import React, {ChangeEvent, useState} from "react";

export type NewListType = {
    addList: (newListTitle: string) => void
}

export const AddListForm = (props: NewListType) => {

    const [newListTitle, setNewListTitle] = useState("")

    const onChangeListInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewListTitle(e.currentTarget.value)
    }

    const addListButtonHandler = () => {
        props.addList(newListTitle)
        setNewListTitle('')
    }

    return (
        <div>
            <input value={newListTitle}
                   onChange={onChangeListInput}
                   type="text"/>

            <button onClick={addListButtonHandler}>Add</button>
        </div>
    )
}*/


import React, {ChangeEvent, useState} from "react";

type AddListFormPropsType = {
    addList: (newName: string) => void
}

export function AddListForm(props: AddListFormPropsType) {

    const [newListName, setNewListName] = useState("")

    const addListInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewListName(e.currentTarget.value)
    }

    const addListButton = () => {
        props.addList(newListName)
        setNewListName('')
    }

    return <div>
        <input value={newListName} onChange={addListInput}/>
        <button onClick={addListButton}>+</button>

    </div>
}
