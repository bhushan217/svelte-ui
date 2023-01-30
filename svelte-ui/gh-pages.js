import { publish } from 'gh-pages';

publish(
 'dist', // path to public directory
 {
  branch: 'gh-pages',
  repo: 'https://github.com/bhushan217/svelte-ui.git',
  user: {
   name: 'Bhushan Kamathe', 
   email: 'bhushan217@gmail.com' 
  },
  dotfiles: true
  },
  () => {
   console.log('Deploy Complete!');
  }
);