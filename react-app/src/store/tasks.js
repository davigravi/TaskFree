const LOAD_TASKS = 'dashboard/LOAD_TASKS';
const DELETE_TASK = 'dashboard/DELETE_TASK';
const ADD_TASK = 'dashboard/ADD_TASK';
const EDIT_TASK = 'dashboard/EDIT_TASK';

//Action Creators
const editTask = (task) => {
    return {
        type: EDIT_TASK,
        task
    }
}


const addTask = (task) => {
    return {
        type: ADD_TASK,
        task
    }
}

const loadTasks = (tasks) => {
    return {
        type: LOAD_TASKS,
        tasks
    };
};


export const deleteTask = (taskId) => {
    console.log(taskId, 'this is the data type returning from deleteTask ')
    return {
        type: DELETE_TASK,
        taskId
    }
}

//Thunks
export const updateTask = (payload) => async dispatch => {
    const res = await fetch('/api/tasks/', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user_id:payload.user_id,
            task_id:payload.task_id,
            description: payload.description,
            task: payload.eTask
        })
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(editTask(data.task));
        return data;
    }else {
        const errors = await res.json();
        return errors.errors
    }
}



export const createTask = (payload) => async dispatch => {
    console.log('in dispatch')
    const res = await fetch('/api/tasks/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id: payload.user_id,
            list_id: payload.list_id,
            description: payload.description,
            task: payload.task,
        })
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addTask(data.task));
        return data;
    } else {
        const errors = await res.json();
        return errors.errors
    }
}



export const removeTask = (payload) => async dispatch => {
    console.log('here')
    const res = await fetch('/api/tasks/', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            task_id: payload.task_id
        })
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(deleteTask(data.deleted_task));
        return data;
    } else {
        const errors = await res.json();
        return errors.errors
    }
}



export const getTasks = () => async dispatch => {
    const res = await fetch('/api/tasks/');

    if (res.ok) {
        const tasks = await res.json();
        dispatch(loadTasks(tasks.tasks));
        return tasks;
    } else {
        const errors = await res.json();
        return errors.errors;
    }

};

const initialState = {
    collection: []
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_TASKS:
            const allCollection = {};
            action.tasks.forEach(task => {
                allCollection[task.id] = task
            });
            return {
                ...state,
                collection: action.tasks,
            };

        case DELETE_TASK:
            const newState = { ...state };
            const newCollection = newState.collection.filter(task => task.id !== action.taskId);
            newState.collection = newCollection;
            delete newState[action.taskId];
            return newState;

        case ADD_TASK: {
            return {
                ...state,
                collection: [...state.collection, action.task]
            };
        }

        case EDIT_TASK:{
            const newState = {...state};
            const index = newState.collection.findIndex(task=>task.id === action.task.id);

            const newCollectionArray = [...newState.collection];
            newCollectionArray[index] = action.task;
            newState.collection = newCollectionArray;

            return newState;
        }
        default:
            return state;
        // case LOAD_TASKS:{
        //     console.log(action, 'this is what they say isnt interable')
        //     return {
        //         ...state,
        //         collection: [...action.tasks]
        //     }


        // }


        // case DELETE_TASK: {
        //     const newState = {...state}
        //     delete newState[action.taskId]
        //     return newState
        // }
    }
}
