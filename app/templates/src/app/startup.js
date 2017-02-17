define(['knockout', './router', './components.config'], function (ko, router, components) {

    // Register all page-components in knockout
    components.pages.forEach(register);

    // Register all regular components
    components.components.forEach(register);


    function register(component){
        ko.components.register(component.name, { require : component.path});
    };
    // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

    // Start the application
    ko.applyBindings({ route : router.currentRoute });
});