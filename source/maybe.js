// @flow

//
// INTEL CONFIDENTIAL
//
// Copyright 2013-2017 Intel Corporation All Rights Reserved.
//
// The source code contained or described herein and all documents related
// to the source code ("Material") are owned by Intel Corporation or its
// suppliers or licensors. Title to the Material remains with Intel Corporation
// or its suppliers and licensors. The Material contains trade secrets and
// proprietary and confidential information of Intel or its suppliers and
// licensors. The Material is protected by worldwide copyright and trade secret
// laws and treaty provisions. No part of the Material may be used, copied,
// reproduced, modified, published, uploaded, posted, transmitted, distributed,
// or disclosed in any way without Intel's prior express written permission.
//
// No license under any patent, copyright, trade secret or other intellectual
// property right is granted to or conferred upon you by disclosure or delivery
// of the Materials, either expressly, by implication, inducement, estoppel or
// otherwise. Any license under such intellectual property rights must be
// express and approved by Intel in writing.

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

export const map = <A, B>(fn: (A) => B, mA: Maybe<A>): Maybe<B> =>
  mA instanceof Just ? ofJust(fn(mA.value)) : mA;

export const withDefault = <A, Ma: Maybe<A>>(defaultFn: () => A, mA: Ma): A =>
  mA instanceof Nothing ? defaultFn() : mA.value;

export const chain = <A, Ma: Maybe<A>>(fn: (A) => Ma, mA: Ma): Ma =>
  mA instanceof Nothing ? mA : fn(mA.value);

export const matchWith = <A, B>(
  cases: {| Just(a: A): B, Nothing(): B |},
  mA: Maybe<A>
): B =>
  mA instanceof Nothing ? cases.Nothing() : cases.Just(mA.value);
