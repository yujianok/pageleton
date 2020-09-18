import { assert, expect } from 'chai';
import pageSpecLoader from '../../src/spec/PageSpecLoader';

describe('Test PageSpecParser', () => {

    it('test readPageSpec', async () => {
        const page = await pageSpecLoader.loadPageSpec('./test/resources/pages/todo-list-page.xml', 'UTF-8');
        expect(page.name).equal('Pageleton');
        expect(page.url).equal('/test/resources/html/example-page.html');
        expect(page.rootComponents.length).equal(3);

        const Header = page.getComponent(['Header']);
        assert.exists(Header);
        assert.notExists(Header.parent);
        expect(Header.name).equal('Header');
        expect(Header.selector).equal('.header')
        assert.notExists(Header.xpath);
        expect(Header.children.length).equal(3);

        const Title = page.getComponent(['Header', 'My To Do List']);
        assert.exists(Title);
        expect(Title.parent?.name).equal('Header');
        expect(Title.name).equal('My To Do List');
        assert.notExists(Title.selector);
        assert.notExists(Title.xpath);
        expect(Title.children.length).equal(0);

        const Input = page.getComponent(['Header', 'My Input']);
        assert.exists(Input);
        expect(Input.parent?.name).equal('Header');
        expect(Input.name).equal('My Input');
        expect(Input.selector).equal('#myInput');
        assert.notExists(Input.xpath);
        expect(Input.children.length).equal(0);

        const Button = page.getComponent(['Header', 'Add']);
        assert.exists(Button);
        expect(Button.parent?.name).equal('Header');
        expect(Button.name).equal('Add');
        assert.notExists(Button.selector);
        assert.notExists(Button.xpath);
        expect(Button.children.length).equal(0);

        const Table = page.getComponent(['Todo List']);
        assert.exists(Table);
        expect(Table.name).equal('Todo List');
        expect(Table.selector).equal('#myUL');
        assert.notExists(Button.xpath);
        expect(Table.children.length).equal(10);

        const TableRows = Table.children;
        assert.exists(TableRows);
        TableRows.forEach((TableRow, i) => {
            expect(TableRow.parent?.name).equal('Todo List');
            expect(TableRow.name).equal(`Item-${i + 1}`);
            expect(TableRow.selector).equal(`li:nth-child(${i + 1})`);
            assert.notExists(Button.xpath);
            expect(Table.children.length).equal(10);

            const Index = page.getComponent(['Todo List', `Item-${i + 1}`, 'Item Index']);
            assert.exists(Index);
            expect(Index.parent?.name).equal(`Item-${i + 1}`);
            expect(Index.name).equal('Item Index');
            expect(Index.xpath).equal('./span[1]');
            assert.notExists(Index.selector);
            expect(Index.children.length).equal(0);

            const Title = page.getComponent(['Todo List', `Item-${i + 1}`, 'Item Title']);
            assert.exists(Title);
            expect(Title.parent?.name).equal(`Item-${i + 1}`);
            expect(Title.name).equal('Item Title');
            expect(Title.xpath).equal('./span[2]');
            assert.notExists(Title.selector);
            expect(Title.children.length).equal(0);

            const Icon = page.getComponent(['Todo List', `Item-${i + 1}`, 'Delete']);
            assert.exists(Icon);
            expect(Icon.parent?.name).equal(`Item-${i + 1}`);
            expect(Icon.name).equal('Delete');
            expect(Icon.xpath).equal('./span[3]');
            assert.notExists(Icon.selector);
            expect(Icon.children.length).equal(0);

        })

    });

});