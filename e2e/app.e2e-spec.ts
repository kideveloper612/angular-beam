import { NgmarcoPage } from './app.po';

describe('ng-marco App', () => {
  let page: NgmarcoPage;

  beforeEach(() => {
    page = new NgmarcoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
