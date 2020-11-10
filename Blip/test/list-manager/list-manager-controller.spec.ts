import { ListManagerController } from 'src/app/home/list-manager/list-manager.controller';

describe('ListManagerController', () => {
  let service: ListManagerController;

  beforeEach(() => {
    service = new ListManagerController();
  })

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('should return text', () => {
    service.setSearchText('text');
    const searchText = service.getSearchText();

    expect(searchText).toEqual('text');
  });
});