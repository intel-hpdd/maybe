// @flow

import {env, jasmine} from '../bin/test';
const {describe, it, expect} = env;

import {default as Maybe, withDefault} from '../source/maybe';

describe('Maybe', () => {
  it('should return a new Maybe when of is called', () => {
    expect(Maybe.of(5)).toEqual(jasmine.any(Maybe));
  });

  describe('join method', () => {
    it('should join to maybe if nothing', () => {
      expect(Maybe.of(null).join() instanceof Maybe).toBe(true);
    });

    it('should join to value if not null', () => {
      expect(Maybe.of(5).join()).toBe(5);
    });
  });

  describe('map method', () => {
    it('should not transform null', () => {
      expect(Maybe.of(null).map((x) => x + 1).value).toBe(null);
    });

    it('should transform a value', () => {
      expect(Maybe.of(5).map((x) => x + 1).value).toBe(6);
    });
  });

  describe('isNothing method', () => {
    it('should return true when value is nothing', () => {
      expect(Maybe.of(null).isNothing()).toBe(true);
    });

    it('should return false when value is just', () => {
      expect(Maybe.of(5).isNothing()).toBe(false);
    });
  });

  describe('chain method', () => {
    it('should map and unwrap a value', () => {
      expect(Maybe.of(5).chain((x) => x + 1)).toBe(6);
    });

    it('should return nothing on null', () => {
      expect(Maybe.of(null).chain((x) => x + 1)).toEqual(jasmine.any(Maybe));
    });
  });

  describe('ap method', () => {
    it('should map to another type when there is a value', () => {
      expect(Maybe.of(5).ap({ map: (x) => x + 1 })).toBe(6);
    });

    it('should return nothing on null', () => {
      expect(Maybe.of(null).ap({ map: (x) => x + 1 })).toEqual(jasmine.any(Maybe));
    });
  });

  describe('with default', () => {
    it('should return value if just', () => {
      expect(withDefault(() => 'foo', Maybe.of(4))).toBe(4);
    });

    it('should call defaultFn if nothing', () => {
      expect(withDefault(() => 'foo', Maybe.of(null))).toBe('foo');
    });
  });
});
