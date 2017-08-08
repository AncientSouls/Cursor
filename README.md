# AncientCursor

[![npm version](https://badge.fury.io/js/ancient-cursor.svg)](https://badge.fury.io/js/ancient-cursor)
[![Join the chat at https://gitter.im/AncientSouls/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/AncientSouls/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Utilities for tracking changes of complex or plain remote data.

## Install
```bash
npm install --save ancient-cursor
```

## Therms

### Complex data

Data with an deverse structure, for example, dependent on the query.
For example, it could be a query that connects multiple rows in different tables to some custom object.
In such a structure, it may be difficult or impossible to get the document identifier, the particular document or its type. It can be just an excerpt from a lot of information.

Example of your custom query on sql language:
```js
{
  query: `SELECT * FROM weather INNER JOIN cities ON (weather.city = cities.name);`,
  storage: 'posgresql',
}
```

Example of result data:
```js
[
  {
    city: 'Neverlend',
    name: 'Neverlend',
    temp_lo: 37,
    temp_hi: 54,
    date: "1994-11-29",
    location: [-194,53],
  }
]
```

### Plain data

Data at each level is rigidly tied to some abstraction, type or schema and has a unique identifier in some storage.

Example of your custom query on mongodb language:
```js
{
  method: 'find',
  collection: 'weather',
  query: { name: 'Neverlend' },
  storage: 'mongodb',
}
```

Example of result data:
```js
[
  {
    _id: "507f191e810c19729de860ea",
    city: 'Neverlend',
    temp_lo: 37,
    temp_hi: 54,
    date: "1994-11-29",
  }
]
```

For more typing and splitting the result set, the server can add some field, such as `__type`.

## Lifecycle of data

- client: Create any custom **query** to your server.
  - The query is any json structure, it can be graphlq with any additional data or anything at your discretion.
- client: Construct **instance of cursor** for not yet received data by query. Send a **query to the server** in any your custom way.
- server: Generate first data response to current query, and **send data back to client**.
  - You can think that the query contained a subscription request for requested data changes. With the help of our tracking utilites, or without, you can generate bundles for each cursor for each client. Then you can send it with any custom transport, in your application.
- client: Use our utilites (or your custom if you want) for execute bundle for current client, to each cursor.
  - Send changes on our format, (or your custom format if your want) to each cursors for data update.
    - This will emit a notification to be sent to anyone who listens to this cursor.

Simple example of fake server-client logic writed in test `concepts` > `fake primitive server-client`.

## Tests

Tests can be started with comand `npm install ancient-cursor && cd ./node_modules/ancient-cursor && npm run compile && npm test`. For more information lern [src/tests/index.js](https://github.com/AncientSouls/Cursor/blob/master/src/tests/index.js).

## License

The MIT License (MIT)
Copyright (c) 2016 Ivan S Glazunov <ivansglazunov@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
