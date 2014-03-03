describe('Products', function () {
    beforeEach(function () {
        browser().navigateTo('/');
    });
    it('I want to create ', function () {
        sleep(1);
        browser().navigateTo('/');
        sleep(1);
        browser().navigateTo('/');
        sleep(10);
        browser().navigateTo('/');
        sleep(10);
        browser().navigateTo('/');
        expect(element('a').text()).toEqual('Продукты');
//        input('user').enter('jacksparrow');
//        element(':button').click();
//        expect(repeater('ul li').count()).toEqual(10);
//        input('filterText').enter('Bees');
//        expect(repeater('ul li').count()).toEqual(1);
    });
});