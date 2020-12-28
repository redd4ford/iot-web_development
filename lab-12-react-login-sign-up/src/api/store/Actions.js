export const addItem = (payload) => {
    return {
        type: 'ADD',
        payload
    }
}

export const removeItem = (payload) => {
    return {
        type: 'REMOVE',
        payload
    }
}

export const increment = (payload) => {
    return {
        type: 'INCREMENT',
        payload
    }
}

export const decrement = (payload) => {
    return {
        type: 'DECREMENT',
        payload
    }
}