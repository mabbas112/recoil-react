import { atom } from "recoil";

export const todosAtom = atom({
    key: 'todosAtom',
    default: []
})

export const todoFilterAtom = atom({
    key: 'todoFilterAtom',
    default: ''
});