import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // plugins: [svelte(), {
  //   name: 'custom-css-name',
  //   generateBundle(outputOptions, bundle) {
  //     bundle['style.css'].fileName = 'bundle.css';
  //     bundle['bundle.css'] = bundle['style.css']
  //     delete bundle['style.css']

  //   }
  // }],
  // build:{
  //   lib: {
  //     entry: 'src/App.svetle',
  //     formats:['es'],
  //     name: 'app',
  //     fileName: () => 'bundle.js' //+ format
  //   }
  // }
})
