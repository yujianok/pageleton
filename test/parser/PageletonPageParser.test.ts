import { expect, assert } from 'chai';
import path from 'path';
import { pageletonPageLoader } from '../../src';

describe('Test PageletonPageParser', () => {

    it('test readPageSpec', async () => {
        const page = await pageletonPageLoader.loadPageSpec(path.join(__dirname, '../resources/pages/test-page.xml'));
       
        expect(page.name).equal('test page');
        expect(page.path).equal('/test.html');
        expect(page.rootComponents.length).equal(2);
        
        const menu = page.getRootComponent('menu');
        assert.exists(menu);
        expect(menu?.name).equal('menu');
        expect(menu?.selector).equal('.menu');
        expect(menu?.children.length).equal(1);

        const button = menu?.children[0];
        assert.exists(button);
        expect(button?.name).equal('{string} button');
        expect(button?.selector).equal('.button');
        expect(button?.dynamic).equal(true);

        const Toolbar = page.getRootComponent('toolbar');
        assert.exists(Toolbar);
        expect(Toolbar?.name).equal('toolbar');
        expect(Toolbar?.selector).equal('.toolbar');
        expect(Toolbar?.dynamic).equal(false);
        expect(Toolbar?.children.length).equal(2);

        const Input = Toolbar?.children[0];
        assert.exists(Input);
        expect(Input?.name).equal('search');
        expect(Input?.selector).equal('.search');
        expect(Input?.dynamic).equal(false);
    
        const Button = Toolbar?.children[1];
        assert.exists(Button);
        expect(Button?.name).equal('{string} button');
        expect(Button?.selector).equal('.button');
        expect(Button?.dynamic).equal(true);
    });

});