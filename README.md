# Ancient Cursor

Abstract container of data synchronization.

[![NPM](https://img.shields.io/npm/v/ancient-cursor.svg)](https://www.npmjs.com/package/ancient-cursor)
[![Build Status](https://travis-ci.org/AncientSouls/Cursor.svg?branch=master)](https://travis-ci.org/AncientSouls/Cursor)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c81b6e5866d14bfe98ceb5ff0c5554da)](https://www.codacy.com/app/ivansglazunov/Cursor?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=AncientSouls/Cursor&amp;utm_campaign=Badge_Grade)
[![Read the Docs](https://img.shields.io/readthedocs/pip.svg)](https://ancientsouls.github.io/)

## Install

```
npm i ancient-cursor
```
## About 

Contains superclasses and functions for querying and actualising data at all with possibilities make it able for storing and changing data.

### Bundle

"Box" for data-changings with functions and parsers to work with it.

#### Example

```ts
import {
  TBundlePaths,
  get,
  bundleParsers,
} from 'ancient-cursor/lib/bundle';

const paths:TBundlePaths = ['a', { b:2 }, 'c'];
const path:TBundlePaths = 'a.1.c';
const data = { a:[{ b:3, c:4 }, { b:2, c:5 }] };
get (data, paths) = 5; // true
get (data, path) = 5; // true

const container = { data };
bundleParsers.extend(container, {
  type: 'extend',
  path: 'a.0',
  value: { d: 234 },
});

container.data =  { a:[{ b:3, c:4, d:234 }, { b:2, c:5 }] } // true;
```

### Cursor

Heart of data synchronization, unique container which has bundle parsing/applying functionality.

#### Example

```ts
import {
  Cursor,
  apply,
} from '../lib/cursor';

const cursor = new Cursor(); 
cursor.exec(true, { a: [{ b: { c: 'd' } }] });
apply(
  cursor, {
    type: 'set',
    path: 'a.0',
    value: { d: { e: 'f' } },
  },
);

cursor.data = { a: [{ d: { e: 'f' } }] };
```

### Stackable-cursor

Extends Cursor with queue funcionality.

#### Example

```ts
import {
  StackableCursor,
} from '../lib/stackable-cursor';

  const cursor = new StackableCursor();
  cursor.exec(undefined, { a: [{ b: { c: 123 } }] });

  cursor.apply({ indexInStack: 2, type: 'set', path: 'a.0.b.c', value: 345 });
  assert.equal(_.size(cursor.bundlesStack), 1);
  assert.equal(cursor.nextBundleIndex, 0);
  assert.equal(cursor.get('a.0.b.c'), 123);

  cursor.apply({ indexInStack: 0, type: 'set', path: 'a.0.b.c', value: 456 });
  assert.equal(_.size(cursor.bundlesStack), 1);
  assert.equal(cursor.nextBundleIndex, 1);
  assert.equal(cursor.get('a.0.b.c'), 456);
```