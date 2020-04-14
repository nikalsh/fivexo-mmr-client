import { writable } from 'svelte/store';

export const playerStore = writable(0)

export const gameStore = writable()

export const queueStore = writable()

export const gameSocketStore = writable()

export const gameCharacterStore = writable()