// @flow

//
// Copyright (c) 2017 DDN. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

export class Just<A> {
  value: A;
  constructor(a: A): void {
    this.value = a;
  }
}

export class Nothing {}

export type Maybe<A> = Nothing | Just<A>;

export const ofJust = <A>(a: A): Just<A> => new Just(a);
export const ofNothing = () => new Nothing();

export const of = <A>(a: ?A): Maybe<A> =>
  a == null ? new Nothing() : new Just(a);

export const fromJust = <A>(mA: Just<A>): A => mA.value;

export const from = <A>(mA: Maybe<A>): ?A =>
  mA instanceof Just ? mA.value : null;

export const map = <A, B>(fn: A => B, mA: Maybe<A>): Maybe<B> =>
  mA instanceof Just ? ofJust(fn(mA.value)) : mA;

export const withDefault = <A, Ma: Maybe<A>>(defaultFn: () => A, mA: Ma): A =>
  mA instanceof Nothing ? defaultFn() : mA.value;

export const chain = <A, Ma: Maybe<A>>(fn: A => Ma, mA: Ma): Ma =>
  mA instanceof Nothing ? mA : fn(mA.value);

export const matchWith = <A, B>(
  cases: {| Just(a: A): B, Nothing(): B |},
  mA: Maybe<A>
): B => (mA instanceof Nothing ? cases.Nothing() : cases.Just(mA.value));
