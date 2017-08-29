## Maybe

[![Build Status](https://travis-ci.org/intel-hpdd/maybe.svg?branch=master)](https://travis-ci.org/intel-hpdd/maybe)

[![Greenkeeper badge](https://badges.greenkeeper.io/intel-hpdd/maybe.svg)](https://greenkeeper.io/)

`Maybe` is a datatype that represents a value that may or may not be there. It is useful to explicitly model where a possible null type may occur. Once we wrap a value in `Maybe`, all future computations will be skipped if they are `null` (or `undefined`).
