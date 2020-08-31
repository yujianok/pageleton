import { expect, assert } from 'chai';
import path from 'path';
import { PageletonPageLoader } from '../../src';

describe('Test PageletonPageParser', () => {

    it('test readPageSpec', async () => {
        const pageletonPageLoader = new PageletonPageLoader();
        const page = await pageletonPageLoader.loadPageSpec(path.join(__dirname, '../resources/pages/test-page.xml'));

        expect(page.name).equal('test page');
        expect(page.path).equal('/test.html');
        expect(page.rootComponents.length).equal(2);

        const menu = page.getRootComponent('menu');
        assert.exists(menu);
        expect(menu!.name).equal('menu');
        expect(menu!.selector).equal('.menu');
        expect(menu!.children.length).equal(3);

        const buttons = menu!.children;
        assert.exists(buttons);
        buttons.forEach((button, i) => {
            const index = i + 1;
            expect(button?.name).equal('button-' + index);
            expect(button?.selector).equal(`.button:nth-child(${index})`);
            expect(button?.index).equal(index);
        })

        const Toolbar = page.getRootComponent('toolbar');
        assert.exists(Toolbar);
        expect(Toolbar?.name).equal('toolbar');
        expect(Toolbar?.selector).equal('.toolbar');
        expect(Toolbar?.index).equal(1);
        expect(Toolbar?.children.length).equal(2);

        const Input = Toolbar?.children[0];
        assert.exists(Input);
        expect(Input?.name).equal('search');
        expect(Input?.selector).equal('.search');
        expect(Input?.index).equal(1);

        const Button = Toolbar?.children[1];
        assert.exists(Button);
        expect(Button?.name).equal('{text} button');
        expect(Button?.selector).equal('.button');
        expect(Button?.index).equal(1);
    });

});