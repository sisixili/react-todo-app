import { useState } from 'react'

export function NewTodoForm({ onSubmit }) { // destructuring props (aka attributes passed in from App.jsx)

    // This useState updates the input bar so that it displays whatever the user types
    const [newItem, setNewItem] = useState("") 
    // doing just setNewItem("Item 1") will cause infinite loop (changing state variable always rerenders entire component)
    // Instead, have newItem variable inside of HTML component

    function handleSubmit(e) {
        e.preventDefault(); // prevent default form submission behaviour. Instead, do custom submit handling
        if (newItem === "") return // empty input case
     
        onSubmit(newItem) // addTodo passed in from app.jsx. If not destructured, then props.onSubmit
    
        setNewItem("") // Clear input bar after submission
    }

    return (
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
                <label htmlFor="item">Add New Item</label>
                <input
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    type="text"
                    id="item" />
            </div>
            <button className="btn">Add</button>
        </form>
    )
}


