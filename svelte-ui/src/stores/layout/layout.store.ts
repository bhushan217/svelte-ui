import { writable, get } from 'svelte/store';

export interface Nav {
  path: string | string[];
  title: string;
  active?: boolean;
}
export interface LayoutState {
  isSideNavClosed: boolean;
  sideNavs: Array<Nav>;
  topNavs: Array<Nav>;

}
const INITIAL_STATE: LayoutState = {
  isSideNavClosed: true,
  sideNavs: [
    {
      path: '/#1',
      title: 'About',
    },
    {
      path: '/#2',
      title: 'Home',
    },
    {
      path: '/#3',
      title: 'Client',
    },
    {
      path: '/#4',
      title: 'Contact',
    },
  ],
  topNavs: [
    {
      path: '/#About',
      title: 'About',
    },
    {
      path: '/#Team',
      title: 'Team',
      active: true,
    },
    {
      path: '/#Services',
      title: 'Services',
    },
    {
      path: '/#Careers',
      title: 'Careers',
    },
  ]
}
export const layoutStore = ((initialState) => {
  const { subscribe, set, update } = writable(initialState);
  const setSideNavActive = (sideNavTitle) => update(state => {
    const sideNavs = state.sideNavs.map( eSN => {
       eSN.active = eSN.title === sideNavTitle ;
        return eSN;
      })
    return {...state, sideNavs}
  })
  const setTopNavActive = (topNavPath) => update(state => {
    const topNavs = state.topNavs.map( eTN => {
      eTN.active = eTN.path === topNavPath ;
      return eTN;
    })
    return {...state, topNavs}
  })
  return {
    subscribe,
    toggle: () => update(state => ({ ...state, isSideNavClosed: !state.isSideNavClosed })),
    addSideNavs: ( sideNavs) => update(state => ({...state, sideNavs})),
    get,
    setSideNavActive,
    setTopNavActive,
    reset: () => set(initialState)
  };
})(INITIAL_STATE);