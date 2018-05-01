# Ancient Cursor

Abstract container of data synchronization.

[![NPM](https://img.shields.io/npm/v/ancient-cursor.svg)](https://www.npmjs.com/package/ancient-cursor)
[![Build Status](https://travis-ci.org/AncientSouls/Cursor.svg?branch=master)](https://travis-ci.org/AncientSouls/Cursor)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c81b6e5866d14bfe98ceb5ff0c5554da)](https://www.codacy.com/app/ivansglazunov/Cursor?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=AncientSouls/Cursor&amp;utm_campaign=Badge_Grade)
[![Read the Docs](https://img.shields.io/readthedocs/pip.svg)](https://ancientsouls.github.io/)

## Install

```
npm i --save ancient-cursor
```
## About 

In most popular realisations of pubsub next abstractions (query, content, transport, source, storage) are stirred or combined, what, for example, makes dependence from current environment or makes schemes for data required.

- `Query` may be in any form.
- No need for schemes in `content`. Use it as desired.
- Cursor knows nothing about `transport`. It have events with data, which should be tracked, and something will make decisions about transporting. (we recommend [ancient-channels](https://github.com/AncientSouls/Channels) and [ancient-peer](https://github.com/AncientSouls/Peer))
- No dependency from `source` of data. It may be database-client or query-lang executor (like GraphQL). (we recommend [ancient-asket](https://github.com/AncientSouls/Asket))
- Use any database as `storage`. (we recommend [ancient-tracker](https://github.com/AncientSouls/Tracker))

### Path
We use this term around all the package. It may be like this
- _.get path syntax: `'a[1].c'` or `['a', 1, 'c']`
- _.get + _.match syntax: `['a', { b:2 }, 'c']`. 

## Bundle

"Box" for data-changings with functions and parsers to work with it.

### Example

```js
import {
  bundleParsers,
} from 'ancient-cursor/lib/bundle';

const container = { data: { a:[{ b:3, c:4 }] } };
bundleParsers.extend(container, {
  type: 'extend',
  path: 'a.0',
  value: { d: 6 },
});
container.data; // { a:[{ b:3, c:4, d:6 }] }
```

[More bundles](https://ancientsouls.github.io/modules/_ancient_cursor_src_lib_bundle_.html)

## Cursor

Simple capsule to actualize remote data. With `cursor.exec()` you can send query to remote data source.
All changes apply using bundles as external stand-alone instructions what and where to change, when called `cursor.apply ()` function. `cursor.apply()` emits 'changed' event, where you can use `watch()` to listen changes by specified path.

### Example

```js
import {
  Cursor,
  watch,
} from '../lib/cursor';

let changed = false;
let watched = false;
const cursor = new Cursor(); 

cursor.on('exec', ({ cursor }) => {
  // Here is transportation logic and after executing cursor.query by remote data-source may be called cursor.apply();
  cursor.apply({
    type: 'set',
    path: '',
    value: { a: [{ b: { c: 'd' } }] },
  });
});
cursor.exec('some query');

cursor.on('changed', ({ bundleChanges }) => {
  changed = true;
  watch(bundleChanges, 'b', () => {
    watched = true;
  });
});

cursor.data // { a: [{ b: { c: 'd' } }] }
cursor.apply({
  type: 'set',
  path: 'a.0',
  value: { d: { e: 'f' } },
});
cursor.data // { a: [{ d: { e: 'f' } }] }
triggered; // true;
watched; // false

cursor.apply({
  type: 'extend',
  path: '',
  value: { b: 123 },
});
cursor.data // { a: [{ d: { e: 'f' } }], b: 123 }
watched; // true
```

### Stackable-cursor

Extends `Cursor` with queue funcionality.

#### Example

```ts
import {
  StackableCursor,
} from '../lib/stackable-cursor';

  const cursor = new StackableCursor();
  cursor.exec(undefined, { a: [{ b: { c: 123 } }] });

  cursor.apply({ indexInStack: 2, type: 'extend', path: 'a.0.b', value: {d: 234} });
  cursor.bundlesStack.length; // 1
  cursor.nextBundleIndex; // 0
  cursor.data; // { a: [{ b: { c: 123 } }] }

  cursor.apply({ indexInStack: 0, type: 'set', path: 'a.0.b.c', value: 456 });
  cursor.bundlesStack.length; // 1
  cursor.nextBundleIndex; // 1
  cursor.data; // { a: [{ b: { c: 456 } }] }

  cursor.apply({ indexInStack: 1, type: 'set', path: 'a.0.b.c', value: 345 });
  cursor.bundlesStack.length; // 0
  cursor.nextBundleIndex; // 3
  cursor.data; // { a: [{ b: { c: 345, d: 234 } }] }
```
