import { expect, assert } from 'chai';
import { pageletonPageLoader } from '../../src';

describe('Test PageletonPageParser', () => {

    it('test readPageSpec', async () => {
        const page = await pageletonPageLoader.loadPageSpec('./test/resources/pages/pageleton-page.xml', 'UTF-8');

        expect(page.name).equal('Pageleton');
        expect(page.url).equal('https://github.com/yujianok/pageleton');
        expect(page.rootComponents.length).equal(3);

        const Header = page.getComponent(['Header']);
        assert.exists(Header);
        expect(Header.name).equal('Header');
        expect(Header.selector).equal('header.Header')
        assert.notExists(Header.xpath);
        expect(Header.children.length).equal(6);

        const Logo = page.getComponent(['Header', 'Github Logo']);
        assert.exists(Logo);
        expect(Logo.name).equal('Github Logo');
        expect(Logo.selector).equal('div.Header-item:nth-child(1)')
        assert.notExists(Logo.xpath);
        expect(Logo.children.length).equal(0);

        const NavBar = page.getComponent(['NavBar']);
        assert.exists(NavBar);
        expect(NavBar.name).equal('NavBar');
        expect(NavBar.selector).equal('ul.UnderlineNav-body');
        expect(NavBar.children.length).equal(7);

        const menus = NavBar.children;
        const expectMenus = ['Code', 'Issues', 'Pull Request', 'Actions', 'Projects', 'Wiki', 'Security'];
        assert.exists(menus);
        menus.forEach((menu, i) => {
            expect(menu.name).equal(expectMenus[i]);
            expect(menu.selector).equal(`li:nth-child(${i + 1})`);
            expect(menu.index).equal(1);
        })

        const Toolbar = page.getComponent(['toolbar']);
        assert.exists(Toolbar);
        expect(Toolbar.name).equal('toolbar');
        expect(Toolbar.selector).equal('.file-navigation');
        expect(Toolbar.index).equal(1);
        expect(Toolbar.children.length).equal(4);

        const Button1 = Toolbar.children[0];
        assert.exists(Button1);
        expect(Button1.name).equal('Branch switcher');
        expect(Button1.selector).equal('#branch-select-menu summary');
        assert.notExists(Button1.xpath)
        expect(Button1.index).equal(1);

        const Button2 = Toolbar.children[1];
        assert.exists(Button2);
        expect(Button2.name).equal('Go to file');
        assert.notExists(Button2.selector)
        expect(Button2.xpath).equal('./a');
        expect(Button2.index).equal(1);

        const Button3 = Toolbar.children[2];
        assert.exists(Button3);
        expect(Button3.name).equal('Code');
        expect(Button3.selector).equal('span');
        expect(Button3.xpath).equal('.//summary');
        expect(Button3.index).equal(1);
    });

});