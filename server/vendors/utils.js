module.exports = (app) => {
  if (!app.get('secret')) {
    app.set('secret', Math.random().toString(16).slice(2));
  }
};
