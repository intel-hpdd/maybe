// @flow

import * as maybe from '../source/maybe.js';
import * as fp from 'intel-fp';

import type {
  Maybe
} from '../source/maybe.js';

describe('Maybe', () => {
  describe('map', () => {
    it('should not transform null', () => {
      const mc = fp.curry2(maybe.map);
      const result:Maybe<string> = maybe.map(
        (x:string):string => x + 'bar',
        maybe.of(null)
      );

      expect(maybe.from(result))
        .toBe(null);
    });

    it('should transform a value', () => {
      const result:Maybe<number> = maybe.map(
        (x:number) => x + 1,
        maybe.of(5)
      );

      expect(maybe.from(result))
        .toBe(6);
    });

    it('should work when curried', () => {
      const result:Maybe<number> = maybe.map(
        (x:number) => x + 1
      )(maybe.of(7));

      expect(maybe.from(result))
        .toBe(8);
    });
  });

  describe('with default', () => {
    it('should return value if just', () => {
      const result:number = maybe.withDefault(
        () => 5,
        maybe.of(4)
      );

      expect(result)
        .toBe(4);
    });

    it('should work when curried', () => {
      const result:number = maybe.withDefault(
        () => 5
      )(maybe.of(7));

      expect(result)
        .toBe(7);
    });

    it('should call defaultFn if nothing', () => {
      const result:'foo' = maybe.withDefault(
        () => 'foo',
        maybe.of(null)
      );

      expect(result)
        .toBe('foo');
    });
  });

  describe('matchWith', () => {
    it('should perform case matches', () => {
      const result:'bar' = maybe.matchWith({
        Just: () => 'bar',
        Nothing: () => 'bar'
      }, maybe.of('foo'));
    });

    it('should call the Nothing case', () => {
      const result:string = maybe.matchWith(
        {
          Just:() => 'boom',
          Nothing:() => 'bap'
        },
        maybe.Nothing
      );

      expect(result)
        .toBe('bap');
    });

    it('should work when curried', () => {
      const result:string = maybe.matchWith({
        Just:(x) => `ba${x}`,
        Nothing:() => 'bap'
      })(maybe.of('p'));

      expect(result)
        .toBe('bap');
    });
  });
});
