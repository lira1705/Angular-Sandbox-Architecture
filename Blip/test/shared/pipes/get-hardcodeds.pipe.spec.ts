import { GetHardCodedPipe} from '../../../src/app/shared/pipes/get-hardcodeds.pipe';

describe('GetHardCodedPipe', () => {
  let pipe: GetHardCodedPipe;

  beforeEach(() => {
    pipe = new GetHardCodedPipe();
  })

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('Error cases', () => {

    it('should return undefined', () => {
      const returnFromNull = pipe.transform(null);
      const returnFromUndefined = pipe.transform(undefined);
      const returnFromEmptyString = pipe.transform('');
      const returnFromWrongString = pipe.transform('TEST.TEST');

      expect(returnFromNull).toEqual(undefined);
      expect(returnFromUndefined).toEqual(undefined);
      expect(returnFromEmptyString).toEqual(undefined);
      expect(returnFromWrongString).toEqual(undefined);
    });
  });

  describe('Success cases', () => {

    it('should return test', () => {
      const test = pipe.transform('TEST');
      expect(test).toEqual('test');
    });

    it('should return nested test', () => {
      const nestedTest = pipe.transform('NESTED_TEST.TEST');
      expect(nestedTest).toEqual('nested test');
    });
  });
});