describe('Products', function() {
    it('I want to create ', function() {
        input('user').enter('jacksparrow');
        element(':button').click();
        expect(repeater('ul li').count()).toEqual(10);
        input('filterText').enter('Bees');
        expect(repeater('ul li').count()).toEqual(1);
    });
});