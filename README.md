# AncientCursor

[![npm version](https://badge.fury.io/js/ancient-cursor.svg)](https://badge.fury.io/js/ancient-cursor)
[![GitHub release](https://img.shields.io/github/release/AncientSouls/Cursor.svg)](https://github.com/AncientSouls/Cursor)
[![Join the chat at https://gitter.im/AncientSouls/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/AncientSouls/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Utilities for tracking changes of complex or plain remote data.

## Install
```bash
npm install --save ancient-cursor
```

## Usage

There are no usage instructions yet, because the options for the end use are growing too fast.

If you want to see examples of using each individual module in the package, please see tests.

If in brief, now this package implements the following abstractions:

- Model of remote maintenance of the relevance of some custom data structure. (`Cursor` in documentation)
- The model of the management of cursors, as well as the factories of cursors. (`CursorsManager` in documentation)
- Model of the manager of a set of Api interfaces obtained from custom sources intended for receiving custom queries from cursors, maintaining a remote cursors and monitoring the moment of its destruction. (`ApiManager` in documentation)
- Model for processing the queue of bands sent from Api to the cursor, to track their sequence and prevent losses. (`BundlesQueue` in documentation)

The following statements are also true for this package:

- Completely modular, allows you to deploy models on top of any application architecture and transports.
- Completely independent of the data structure. For synchronization does not need the concept of documents or id, allows you to retrieve from any remote sources any complex data and maintain their relevance.
- Does not contain query caching, the repeated cursors synchronize the data with the remote source separately, because to implement the cache, you need to understand the structure of the specific data structures of your application. If you need a cache, you can not use cursors directly, but manage them through an interlayer like `alasql`, `backbone`, `relay`, `redux`, `minimongo` and others ...
- Does not depend to any query language, you can use as query any data transmitted anywhere. This means that this package will perfectly cope with the synchronization of data for `graphql`, structural and non-structural data, documents and any other structures from any sources.

## Reason

Too narrow the purpose of alternative implementations.

- `meteor` sync only documents by its ids into specific collection name, very limited `ddp` protocol
- `graphql` recoment sync data by marked in schema id, only for current schema and with description on client in most cases
- `backbone` sync models in collections by id

## Our plans

- So agnostic realization of channels between clients.
- The same modular implementation of the protocol of communication api and customers.
- Ready-made application examples with popular api queries and caching systems.

## Tests

Tests can be started with comand `npm install ancient-cursor && cd ./node_modules/ancient-cursor && npm run compile && npm test`. For more information lern [src/tests/index.js](https://github.com/AncientSouls/Cursor/blob/master/src/tests/index.js).

## License

The MIT License (MIT)
Copyright (c) 2016 Ivan S Glazunov <ivansglazunov@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
