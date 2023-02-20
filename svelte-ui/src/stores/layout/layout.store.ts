import { get, writable } from 'svelte/store';
import type { Nav } from '../models/nav.interface';
const BASE_URL = import.meta.env.BASE_URL;
const BASE_PATH = location.origin + BASE_URL;
export interface LayoutState {
  isSideNavClosed: boolean;
  routes: Array<Nav>;
  currentNav?: Nav;
}

export const toggleDarkMode = () => {
  const classList = document.documentElement.classList;
  console.log({classList})
  if (classList.contains("light")) {
    classList.remove("light")
    classList.add("dark")
  } else if (classList.contains("dark")) {
    classList.remove("dark")
    classList.add("light")
  } else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      classList.add("light")
    } else {
      classList.add("dark")
    }
  }
}

const locationHashChanged = (event) => {  
  console.trace("locationHashChanged location: " + document.location + ", state: " + JSON.stringify(event));
}
window.addEventListener('hashchange', locationHashChanged);

const onpopstate = (event: PopStateEvent) => {
  // console.trace(event.state)
  if(event.state){
    const nextUrl = event.state.nextUrl
    const newPath = nextUrl.toString().substring(BASE_PATH.length)
    layoutStore.setRouteActive(newPath)
  }
}

export const onWindowLoad = () => {
  console.log('onWindowLoad called')
  toggleDarkMode();
  const nextUrl = window.location.href
  const newPath = nextUrl.toString().substring(BASE_PATH.length)
  layoutStore.setRouteActive(newPath)
}


window.addEventListener('popstate', onpopstate);

const INITIAL_STATE: LayoutState = {
  isSideNavClosed: true,
  currentNav: undefined,
  routes: []
}
export const layoutStore = ((initialState) => {
  const { subscribe, set, update } = writable(initialState);
  const setRouteActive = (path: string | string[]) => update(state => {
    let currentNav = state.currentNav;
    const routes = state.routes.map( eTN => {
      const isMatching = eTN.path === path
      if(isMatching){
        //console.trace({path:eTN.path, activePath: path})
        currentNav= eTN;
      }
      eTN.active = isMatching ;
      return eTN;
    })
    //console.trace({currentNav})
    return {...state, currentNav, routes}
  })
  return {
    subscribe,
    toggle: () => update(state => ({ ...state, isSideNavClosed: !state.isSideNavClosed })),
    addRoutes: ( routes: Nav[]) => update(state => ({...state, routes})),
    get,
    setRouteActive,
    reset: () => set(initialState)
  };
})(INITIAL_STATE);

export const routerLink = (node: HTMLAnchorElement, nav: Nav) => {
  //node.preventDefault()
  const routeNavClicked = (e: MouseEvent) => {
    e.preventDefault()
    layoutStore.setRouteActive(nav.path)
    const nextUrl = BASE_PATH+nav.path
    const currentUrl = window.location.href
    const state = { currentUrl, nextUrl }
    //console.trace({state, nav})
    history.pushState(state, 'ABC', nextUrl)
  };
  node.addEventListener('click', routeNavClicked);
	return {
		destroy() {
			node.removeEventListener("click", routeNavClicked, true);
		}
	};
}