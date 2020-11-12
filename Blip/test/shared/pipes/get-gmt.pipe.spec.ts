import { getFormattedGMTPipe } from '../../../src/app/shared/pipes/get-gmt.pipe';

describe('getFormattedGMTPipe', () => {
  let pipe: getFormattedGMTPipe;

  beforeEach(() => {
    pipe = new getFormattedGMTPipe();
  })

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return (UTC - 10:00) Honolulu', () => {
    const gmtDisplay = '(UTC - 10:00) Honolulu';
    const test = pipe.transform('-10');
    expect(test).toEqual(gmtDisplay);
  });

  it('should return empty', () => {
    const emptyString = '';
    const gmtDisplayNull = null;
    const gmtDisplayUndefined = undefined;
    const gmtDisplayEmpty = emptyString;
    const gmtDisplayWrongGMT = '-30';
    const testNull = pipe.transform(gmtDisplayNull);
    const testUndefined = pipe.transform(gmtDisplayUndefined);
    const testEmpty = pipe.transform(gmtDisplayEmpty);
    const testWrongGMT = pipe.transform(gmtDisplayWrongGMT);
    expect(testNull).toEqual(emptyString);
    expect(testUndefined).toEqual(emptyString);
    expect(testEmpty).toEqual(emptyString);
    expect(testWrongGMT).toEqual(emptyString);
  });
});