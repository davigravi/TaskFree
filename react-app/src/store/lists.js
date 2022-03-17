const LOAD_LISTS = 'list/LOAD_LISTS'
const DELETE_LIST = 'list/DELETE_LIST'


//action creators
const deleteList = (listId) => {
    return {
        type: DELETE_LIST,
        listId
    }
}


const loadAllLists = (lists) => {
    return {
        type: LOAD_LISTS,
        lists
    }
}

//thunks
export const removeList = (payload) => async dispatch => {
    console.log('here3')
    const res = await fetch('/api/lists/', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            list_id: payload.list_id
        })
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(deleteList(data.deleted_list));
        return data
    } else {
        const errors = await res.json();
        return errors.errors
    }


}



export const getAllLists = () => async dispatch => {
    const res = await fetch('/api/lists/');

    if (res.ok) {
        const lists = await res.json();
        console.log(lists, 'this is lists from backend')
        dispatch(loadAllLists(lists.lists))
        return lists;
    } else {
        const errors = await res.json();
        return errors.errors;
    }
}


const initialState = {
    lists: []
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_LISTS:
            const allLists = {}
            console.log(action.lists, 'this is action.lists')
            action.lists.forEach(list => {
                allLists[list.id] = list
            });
            return {
                ...state,
                lists: action.lists,
            };

        case DELETE_LIST:
            const newState = { ...state };
            const newLists = newState.lists.filter(list => list.id !== action.listId)
            newState.lists = newLists;
            delete newState[action.listId];
            return newState;

        default:
            return state;
    }





}
