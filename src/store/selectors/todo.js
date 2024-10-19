import { selector } from "recoil";
import { todoFilterAtom, todosAtom } from "../atoms/todo";


export const todosSelectorAtom = selector({
    key: 'todosSelector',
    get: ({ get }) => {
        const todos = get(todosAtom);
        const todoFilter = get(todoFilterAtom)
        return todoFilter ? todos?.filter(todo => (todo.title.includes(todoFilter) || todo.description.includes(todoFilter))) : todos;
    }
})