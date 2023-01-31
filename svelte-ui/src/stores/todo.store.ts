import { writable, get } from "svelte/store";

export interface Todo {
  id: number,
  title: string;
  done: boolean;
  _cat: number;
  _dat?: number;
}
let counter = 1;
export interface TodoState {
  todos: Todo[];
  isLoading: boolean;
}

const INITIAL_STATE: TodoState = {
  isLoading: false,
  todos : [
    {
      id: counter++,
      title: "My getTasks",
      done: false,
      _cat: (new Date()).getTime()
    },
    {
      id: counter++,
      title: "Do Gym",
      done: true,
      _cat: (new Date(2023, 1, 30)).getTime(),
      _dat: (new Date()).getTime()
    }
  ]
}

export const todoStore = ((initialState) => {
  const { subscribe, set, update } = writable(initialState);
  return {
    subscribe,
    add: (title) => update(state => ({
      isLoading: false,
      todos: [...state.todos, <Todo>{
        id: counter++,
        title,
         done: false,
          _cat: (new Date()).getTime()
        }
      ]
    })),
    complete: (id) => update(state => ({
      ...state,
       todos:[...
        state.todos.map(todo=>{
          if(todo.id === id){
            return <Todo>{...todo, done: true,_dat: new Date().getTime()};
          }
          return todo
        })
       ] 
      })
    ),
    remove: (id) => update(state => ({...state, todos: [...state.todos.filter(t=>t.id!==id)]})),
    set,
    get,
    update,
    reset: () => set(initialState)
  };
})(INITIAL_STATE)