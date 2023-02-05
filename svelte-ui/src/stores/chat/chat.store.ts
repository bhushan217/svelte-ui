import io from 'socket.io-client'

import { writable, get } from 'svelte/store';

export interface Message {
  text: string;
  _token?: string;
  email: string;
  to?: string;
}
export interface MessageState {
  isOffline: boolean;
  sending: boolean;
  messages: Message[];
}

const INITIAL_STATE: MessageState = {
  isOffline: true,
  sending: false,
  messages: []
}

export const chatStore = ((initialState) => {
  const { subscribe, set, update } = writable(initialState);
  return {
    subscribe,
    sendMessage: (message) => {
      socket.emit('send message', message)
    },
    setOffline: (isOffline) => {
      update(state => ({...state, isOffline}))
    },
    set,
    get,
    update,
    reset: () => set(initialState)
  };
})(INITIAL_STATE);


const socket = io('/chat-service')
//if(socket.connected){
  socket.on("connect", () => {
    console.log('connected :'+socket.id);
    chatStore.setOffline(false)
    socket.sendBuffer = [];
  });
  socket.on('chat message', (data) => {
    console.log('chat recieved', data)
    chatStore.update(state => ({...state, messages:[...state.messages, data]}))
  })
  socket.on("disconnect", (reason) => {
    chatStore.setOffline(true)
    console.log('Disconnected :'+socket.id, {reason}); // undefined
  });
// }else{
//   chatStore.setOffline(true)
//   console.log('offline - chat-service')
// }