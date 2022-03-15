const LOAD_TASKS = 'dashboard/LOAD_TASKS';

//Action Creators
const loadTasks = (tasks) => {
    return {
        type: LOAD_TASKS,
        data
    };
};


//Thunks
export const getTasks = () => async dispatch => {
    const res = await fetch('/api/tasks/');

    if (res.ok){
        const tasks = await res.json();
        dispatch(loadTasks(tasks));
        return tasks;
    }else {
        const errors = await res.json();
        return errors.errors;
    }

};

const initialState = {
    tasks: []
}


export default function reducer(state = initialState, action){
    switch(action.type){
        case LOAD_TASKS:
            return {
                ...state,
                tasks: [...action.tasks]
            }

        default:
            return state;
    }
}
