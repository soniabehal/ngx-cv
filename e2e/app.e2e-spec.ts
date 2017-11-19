import { NgxCvPage } from './app.po';

describe('ngx-cv App', () => {
  let page: NgxCvPage;

  beforeEach(() => {
    page = new NgxCvPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
