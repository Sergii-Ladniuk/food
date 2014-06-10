exports.MenuGeneralPage = function() {
    return {
        title: element(by.id('title')),
        memberNumber: element(by.id('memberNumber')),
        dayNumber: element(by.id('dayNumber')),
        submit: element(by.id('menu-submit'))
    }
}