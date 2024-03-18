import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  // define:{
  //   'process.env':process.env
  // },
  base:"./client/",
  plugins: [react()],
});
