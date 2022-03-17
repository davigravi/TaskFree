const LOAD_LISTS = 'list/LOAD_LISTS'


const loadAllLists = (lists) => {
    return {
        type: LOAD_LISTS,
        lists
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
    lists : []
}


export default function reducer(state = initialState, action){
    switch (action.type){
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

        default:
            return state;
    }





}
