[ancient-cursor](../README.md) > [ICursor](../interfaces/icursor.md)



# Interface: ICursor

## Type parameters
#### IEventsList :  [ICursorEventsList](icursoreventslist.md)
## Hierarchy


 `any`

**↳ ICursor**








## Properties
<a id="data"></a>

###  data

**●  data**:  *`any`* 

*Defined in [lib/cursor.ts:68](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/cursor.ts#L68)*





___

<a id="query"></a>

###  query

**●  query**:  *`any`* 

*Defined in [lib/cursor.ts:67](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/cursor.ts#L67)*





___

<a id="queryid"></a>

###  queryId

**●  queryId**:  *`string`* 

*Defined in [lib/cursor.ts:66](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/cursor.ts#L66)*





___


## Methods
<a id="apply"></a>

###  apply

► **apply**(bundle: *[IBundle](ibundle.md)*): `this`



*Defined in [lib/cursor.ts:70](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/cursor.ts#L70)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| bundle | [IBundle](ibundle.md)   |  - |





**Returns:** `this`





___

<a id="exec"></a>

###  exec

► **exec**(query: *`any`*, data?: *`any`*): `this`



*Defined in [lib/cursor.ts:69](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/cursor.ts#L69)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| query | `any`   |  - |
| data | `any`   |  - |





**Returns:** `this`





___

<a id="get"></a>

###  get

► **get**(path: *`string`*): `any`



*Defined in [lib/cursor.ts:72](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/cursor.ts#L72)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| path | `string`   |  - |





**Returns:** `any`





___

<a id="parse"></a>

###  parse

► **parse**(bundle: *[IBundle](ibundle.md)*): [IBundleChanges](ibundlechanges.md)



*Defined in [lib/cursor.ts:71](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/cursor.ts#L71)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| bundle | [IBundle](ibundle.md)   |  - |





**Returns:** [IBundleChanges](ibundlechanges.md)





___


