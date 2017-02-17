define(['knockout', 'text!./app.html'], function(ko, template) {

  function App(params) {
    // This viewmodel doesn't do anything except pass through the 'route' parameter to the view.
    this.route = params.route;

  }

  return { viewModel: App, template: template };
});
