const Reducer = (state = [], { type, payload }) => {
    let index = state.findIndex(arrayElement => arrayElement.item.id === payload.item.id);
    if (type === 'ADD') {
        if (index !== -1) {
            state[index].counter += 1;
            return [...state];
        } else {
            state.push({...payload, counter: 1});
            return [...state];
        }
    }
    else if (type === 'INCREMENT') {
        state[index].counter += 1;
        return [...state];
    }
    else if (type === 'DECREMENT') {
        if (state[index].counter > 1) {
            state[index].counter -= 1;
            return [...state];
        } else {
            state.splice(index, 1);
            return [...state];
        }
    }
    else if (type === 'REMOVE') {
        state.splice(index, 1);
        return [...state];
    }
    else {
        return state;
    }
}

export default Reducer;