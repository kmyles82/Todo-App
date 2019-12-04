'use strict'

const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        return todosJSON ? JSON.parse(todosJSON) : [];
    } catch (e) {
        return []
    }
   
}

const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => {
        return todo.id === id
    })

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

//toggle the completed value for a given todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => {
        return todo.id === id
    })

    todo ? todo.completed = !todo.completed : '';
    
}

const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const renderTodos = function (todos, filters) {
    const todoEl = document.querySelector('#todos')
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed )

    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(incompleteTodos))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No to-dos to show'

        todoEl.appendChild(messageEl)
    }
}

//Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    //setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        // todo.completed = !todo.completed
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
        // console.log(todo.completed)
    })

    //setup the todo text
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    //setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    //setup the remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button','button--text')
    todoText.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoEl
}
//Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    const plural = incompleteTodos.length === 1 ? '' : 's'

    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`
    summary.classList.add('list-title')
    return summary
}