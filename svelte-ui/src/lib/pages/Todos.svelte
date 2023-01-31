<script lang="ts">
import {todoStore} from '../../stores/todo.store'
import Toggle from '../fields/Toggle.svelte';

let inputTodo;
const addTodo =  (e) =>{ 
  const title = inputTodo.value?.trim() 
  if(e.keyCode === 13 && title){
    todoStore.add(title)
    inputTodo.value = ''
  }
}
</script>


<div class="card">
  <div class="header">
    <h1 class="date-time">{new Date().toLocaleString()}</h1>
    <small class="muted">{$todoStore.todos.length}</small>
  </div>
  <div class="body">
    <div class="todo-item">
      <input class="form-field" type="text" bind:this={inputTodo}
      on:keyup={(e)=>{addTodo(e)}} placeholder="Enter Todo"/>
    </div>
    {#each $todoStore.todos.sort((a,b)=> a._cat - b._cat || a.title.toString().localeCompare(b.title)) as todo (todo.id)}
    <div class="todo-item">
      <div class="action"><Toggle on:checked={(e)=> { e.detail || todoStore.remove(todo.id)}}></Toggle></div>
      <div class="title">{todo.title}</div>
    </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .card{
    width: 100%;
    height: 100%;
    background-color: var(--bg2-color, #121212);
    .header{
      height: calc(var(--input-height)*3);
      background-color: var(--bg-color, #343434);
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      div{
        flex: 1 0 content;
      }
      .date-time{
        font-size: calc(var(--base-height, 8px) * 3);
      }
      .muted{
        font-size: calc(var(--base-height, 8px) * 2);
        background-color: var(--success);
        border-radius: 50%;
        width: calc(var(--base-height, 8px) * 2);
        height: calc(var(--base-height, 8px) * 2);
        text-align: center;
      }
    }
    .body{
      .todo-item{
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: solid 1px var(--shadow-color, #343434);
        div{
          flex: 1 0 content;
        }
        .form-field{
          height: calc(var(--input-height, 24px) * 2);
          width: 100%;
          border: 0;
          outline: none;
          padding-left: var(--base-padding-xs, 2px) ;
        }
        .action{
          width: calc(var(--input-height, 16px) * 2);
        }
        .title{
          color: var(--text-color, #dfdfdf)
        }
      }
    }
  }
</style>