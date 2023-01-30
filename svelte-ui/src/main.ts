import './app.scss'
import App from './App.svelte'
import { onWindowLoad } from './stores/layout/layout.store';
window.onload = onWindowLoad
console.debug('onWindowLoad attached')
const app = new App({
  target: document.getElementById('app'),
})

export default app
