const LOAD_TASKS = 'dashboard/LOAD_TASKS';
const DELETE_TASK = 'dashboard/DELETE_TASK';

//Action Creators
const loadTasks = (tasks) => {
    return {
        type: LOAD_TASKS,
        tasks
    };
};


const deleteTask = (taskId) => {
    return {
        type: DELETE_TASK,
        taskId
    }
}

//Thunks

export const removeTask = (payload) => async dispatch => {
    console.log('here')
    const res = await fetch('/api/tasks/', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            task_id: payload.task_id
        })
    });

    if (res.ok){
        const data = await res.json();
        dispatch(deleteTask(data.deleted_task));
        return data;
    }else {
        const errors = await res.json();
        return errors.errors
    }
}



export const getTasks = () => async dispatch => {
    const res = await fetch('/api/tasks/');

    if (res.ok){
        const tasks = await res.json();
        console.log(tasks, 'this is tasks')
        dispatch(loadTasks(tasks.tasks));
        return tasks;
    }else {
        const errors = await res.json();
        return errors.errors;
    }

};

const initialState = {
    collection: []
}


export default function reducer(state = initialState, action){
    switch(action.type){
        // case LOAD_TASKS:{
        //     console.log(action, 'this is what they say isnt interable')
        //     return {
        //         ...state,
        //         collection: [...action.tasks]
        //     }


        // }
        case LOAD_TASKS:
            console.log(action, 'this is what they say isnt interable')
            console.log(action.tasks, 'this is what they say isnt interable')
            const allCollection = {};
            action.tasks.forEach(task=>{
                allCollection[task.id] = task
            })
            return {
                ...state,
                collection: action.tasks,
            }

        case DELETE_TASK:
            const newState = {...state}
            const newCollection = newState.collection.filter(task => task.id !== action.taskId)
            newState.collection = newCollection;
            delete newState[action.taskId]
            return newState;

        // case DELETE_TASK: {
        //     const newState = {...state}
        //     delete newState[action.taskId]
        //     return newState
        // }

        default:
            return state;
    }
}
