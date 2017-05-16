// @flow

import * as maybe from '../source/maybe.js';

import type { Maybe } from '../source/maybe.js';

import { describe, it, expect } from './jasmine';

describe('Maybe', () => {
  describe('map', () => {
    it('should not transform null', () => {
      const result: Maybe<string> = maybe.map(
        (x: string): string => `${x}bar`,
        maybe.ofNothing()
      );

      expect(result instanceof maybe.Nothing).toBe(true);
    });

    it('should transform a value', () => {
      const result: Maybe<number> = maybe.map(
        (x: number): number => x + 1,
        maybe.of(5)
      );

      expect(maybe.from(result)).toBe(6);
    });

    it('should work when bound', () => {
      const mapFn: (Maybe<number>) => Maybe<number> = maybe.map.bind(
        null,
        (x: number): number => x + 1
      );

      expect(mapFn(maybe.ofJust(7))).toEqual(new maybe.Just(8));
    });

    it('should work with nothing', () => {
      const result: Maybe<'foo'> = maybe.map(
        (): 'foo' => 'foo',
        maybe.ofNothing()
      );

      expect(result instanceof maybe.Nothing).toBe(true);
    });
  });

  describe('with default', () => {
    it('should return value if just', () => {
      const result: number = maybe.withDefault(
        (): number => 5,
        maybe.ofJust(4)
      );

      expect(result).toBe(4);
    });

    it('should work when bound', () => {
      const defaultNum = maybe.withDefault.bind(null, () => 5);

      const result: number = defaultNum(maybe.ofJust(7));

      expect(result).toBe(7);
    });

    it('should call defaultFn if nothing', () => {
      const result: 'foo' = maybe.withDefault(() => 'foo', maybe.ofNothing());

      expect(result).toBe('foo');
    });
  });

  describe('matchWith', () => {
    it('should perform case matches', () => {
      const result: 'bar' = maybe.matchWith(
        {
          Just: (): 'bar' => 'bar',
          Nothing: (): 'bar' => 'bar'
        },
        maybe.ofJust('foo')
      );

      expect(result).toBe('bar');
    });

    it('should call the Nothing case', () => {
      const result: string = maybe.matchWith(
        { Just: () => 'boom', Nothing: () => 'bap' },
        maybe.ofNothing()
      );

      expect(result).toBe('bap');
    });

    it('should work when bound', () => {
      const matchFn: (Maybe<'p'>) => string = maybe.matchWith.bind(null, {
        Just: x => `ba${x}`,
        Nothing: () => 'bap'
      });

      expect(matchFn(maybe.of('p'))).toBe('bap');
    });
  });

  describe('chain', () => {
    it('should chain with nothing', () => {
      const key = 'name';
      const options = ['street', 'phone', 'city', 'state', 'zip'];

      const result = maybe.chain(
        x => {
          const token = options.find(val => val === x);
          return !token ? maybe.ofNothing() : maybe.ofJust(token);
        },
        maybe.of(key)
      );

      expect(result instanceof maybe.Nothing).toBe(true);
    });

    it('should chain with a value', () => {
      const key = 'name';
      const options = ['street', 'phone', 'city', 'name', 'state', 'zip'];

      const result = maybe.chain(
        x => {
          const token = options.find(val => val === x);
          return !token ? maybe.ofNothing() : maybe.ofJust(token);
        },
        maybe.of(key)
      );

      expect(result).toEqual(maybe.ofJust('name'));
    });
  });
});
