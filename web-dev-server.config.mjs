// web-dev-server.config.mjs
const hmr = process.argv.includes('--hmr');

export default {
  open: 'index.html', 
  watch: !hmr,
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },
  appIndex: 'index.html', 
  plugins: [
    
  ],
};
