import { writable, get } from "svelte/store";
import type { Nav } from "../models/nav.interface"

export interface RouterState extends Nav {
  data?: any | undefined;
}
const INITIAL_STATE: RouterState = {
  path: "/",
  title: "Home"
}
export const routerStore = ((initialState) => {

  const { subscribe, set, update } = writable(initialState);
  return {
    subscribe,
    set,
    get,
    update,
    reset: () => set(initialState)
  };
})(INITIAL_STATE)