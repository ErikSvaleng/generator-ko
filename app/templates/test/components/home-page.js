define(['home', 'intern!bdd', 'intern/chai!expect'], function (homePage, bdd, expect) {
    var HomePageViewModel = homePage.viewModel;

    bdd.describe('Home page view model', function () {

        bdd.it('should supply a friendly message which changes when acted upon', function () {
            var instance = new HomePageViewModel();
            expect(instance.message()).to.contain('Welcome to ');

            // See the message change
            instance.doSomething();
            expect(instance.message()).to.contain('You invoked doSomething()');
        });

    });

});
