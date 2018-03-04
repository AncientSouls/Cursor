[ancient-cursor](../README.md) > ["cursor"](../modules/_cursor_.md) > [Cursor](../classes/_cursor_.cursor.md)



# Class: Cursor

## Type parameters
#### IEventsList :  [ICursorEventsList](../interfaces/_cursor_.icursoreventslist.md)
## Hierarchy


↳  [ICursor](../interfaces/_cursor_.icursor.md)

**↳ Cursor**







## Indexable

\[key: `string`\]:&nbsp;`any`
## Index

### Constructors

* [constructor](_cursor_.cursor.md#constructor)


### Properties

* [data](_cursor_.cursor.md#data)
* [destroy](_cursor_.cursor.md#destroy)
* [emitter](_cursor_.cursor.md#emitter)
* [generateId](_cursor_.cursor.md#generateid)
* [id](_cursor_.cursor.md#id)
* [isDestroyed](_cursor_.cursor.md#isdestroyed)
* [query](_cursor_.cursor.md#query)
* [queryId](_cursor_.cursor.md#queryid)


### Methods

* [apply](_cursor_.cursor.md#apply)
* [emit](_cursor_.cursor.md#emit)
* [exec](_cursor_.cursor.md#exec)
* [get](_cursor_.cursor.md#get)
* [off](_cursor_.cursor.md#off)
* [on](_cursor_.cursor.md#on)
* [once](_cursor_.cursor.md#once)
* [parse](_cursor_.cursor.md#parse)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Cursor**(id?: *`string`*): `any`


*Inherited from INode.__new*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:11*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| id | `string`   |  - |





**Returns:** `any`

---


## Properties
<a id="data"></a>

### «Static» data

**●  data**:  *`any`* 

*Inherited from [ICursor](../interfaces/_cursor_.icursor.md).[data](../interfaces/_cursor_.icursor.md#data)*

*Defined in [cursor.ts:68](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/cursor.ts#L68)*





___

<a id="destroy"></a>

### «Static» destroy

**●  destroy**:  *`function`* 

*Inherited from INode.destroy*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:15*


#### Type declaration
►(): `void`





**Returns:** `void`






___

<a id="emitter"></a>

### «Static» emitter

**●  emitter**:  *`EventEmitter`* 

*Inherited from IEvents.emitter*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/events.d.ts:5*





___

<a id="generateid"></a>

### «Static» generateId

**●  generateId**:  *`function`* 

*Inherited from INode.generateId*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:13*


#### Type declaration
►(): `string`





**Returns:** `string`






___

<a id="id"></a>

### «Static» id

**●  id**:  *`string`* 

*Inherited from INode.id*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:11*





___

<a id="isdestroyed"></a>

### «Static» isDestroyed

**●  isDestroyed**:  *`boolean`* 

*Inherited from INode.isDestroyed*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:14*





___

<a id="query"></a>

### «Static» query

**●  query**:  *`any`* 

*Inherited from [ICursor](../interfaces/_cursor_.icursor.md).[query](../interfaces/_cursor_.icursor.md#query)*

*Defined in [cursor.ts:67](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/cursor.ts#L67)*





___

<a id="queryid"></a>

### «Static» queryId

**●  queryId**:  *`string`* 

*Inherited from [ICursor](../interfaces/_cursor_.icursor.md).[queryId](../interfaces/_cursor_.icursor.md#queryid)*

*Defined in [cursor.ts:66](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/cursor.ts#L66)*





___


## Methods
<a id="apply"></a>

### «Static» apply

► **apply**(bundle: *[IBundle](../interfaces/_bundle_.ibundle.md)*): `this`



*Inherited from [ICursor](../interfaces/_cursor_.icursor.md).[apply](../interfaces/_cursor_.icursor.md#apply)*

*Defined in [cursor.ts:70](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/cursor.ts#L70)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| bundle | [IBundle](../interfaces/_bundle_.ibundle.md)   |  - |





**Returns:** `this`





___

<a id="emit"></a>

### «Static» emit

► **emit**IE(eventName: *`string`*, data: *`IEventsList[IE]`*): `this`



*Inherited from IEvents.emit*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/events.d.ts:6*



**Type parameters:**

#### IE :  `keyof IEventsList`
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| eventName | `string`   |  - |
| data | `IEventsList[IE]`   |  - |





**Returns:** `this`





___

<a id="exec"></a>

### «Static» exec

► **exec**(query: *`any`*, data?: *`any`*): `this`



*Inherited from [ICursor](../interfaces/_cursor_.icursor.md).[exec](../interfaces/_cursor_.icursor.md#exec)*

*Defined in [cursor.ts:69](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/cursor.ts#L69)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| query | `any`   |  - |
| data | `any`   |  - |





**Returns:** `this`





___

<a id="get"></a>

### «Static» get

► **get**(path: *`string`*): `any`



*Inherited from [ICursor](../interfaces/_cursor_.icursor.md).[get](../interfaces/_cursor_.icursor.md#get)*

*Defined in [cursor.ts:72](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/cursor.ts#L72)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| path | `string`   |  - |





**Returns:** `any`





___

<a id="off"></a>

### «Static» off

► **off**IE(eventName: *`string`*, listener: *`function`*): `this`



*Inherited from IEvents.off*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/events.d.ts:9*



**Type parameters:**

#### IE :  `keyof IEventsList`
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| eventName | `string`   |  - |
| listener | `function`   |  - |





**Returns:** `this`





___

<a id="on"></a>

### «Static» on

► **on**IE(eventName: *`string`*, listener: *`function`*): `this`



*Inherited from IEvents.on*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/events.d.ts:7*



**Type parameters:**

#### IE :  `keyof IEventsList`
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| eventName | `string`   |  - |
| listener | `function`   |  - |





**Returns:** `this`





___

<a id="once"></a>

### «Static» once

► **once**IE(eventName: *`string`*, listener: *`function`*): `this`



*Inherited from IEvents.once*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/events.d.ts:8*



**Type parameters:**

#### IE :  `keyof IEventsList`
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| eventName | `string`   |  - |
| listener | `function`   |  - |





**Returns:** `this`





___

<a id="parse"></a>

### «Static» parse

► **parse**(bundle: *[IBundle](../interfaces/_bundle_.ibundle.md)*): [IBundleChanges](../interfaces/_bundle_.ibundlechanges.md)



*Inherited from [ICursor](../interfaces/_cursor_.icursor.md).[parse](../interfaces/_cursor_.icursor.md#parse)*

*Defined in [cursor.ts:71](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/cursor.ts#L71)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| bundle | [IBundle](../interfaces/_bundle_.ibundle.md)   |  - |





**Returns:** [IBundleChanges](../interfaces/_bundle_.ibundlechanges.md)





___


