[ancient-cursor](../README.md) > [Cursor](../classes/cursor.md)



# Class: Cursor

## Type parameters
#### IEventsList :  [ICursorEventsList](../interfaces/icursoreventslist.md)
## Hierarchy


↳  [ICursor](../interfaces/icursor.md)

**↳ Cursor**







## Indexable

\[key: `string`\]:&nbsp;`any`
## Index

### Constructors

* [constructor](cursor.md#constructor)


### Properties

* [data](cursor.md#data)
* [destroy](cursor.md#destroy)
* [emitter](cursor.md#emitter)
* [generateId](cursor.md#generateid)
* [id](cursor.md#id)
* [isDestroyed](cursor.md#isdestroyed)
* [query](cursor.md#query)
* [queryId](cursor.md#queryid)


### Methods

* [apply](cursor.md#apply)
* [emit](cursor.md#emit)
* [exec](cursor.md#exec)
* [get](cursor.md#get)
* [off](cursor.md#off)
* [on](cursor.md#on)
* [once](cursor.md#once)
* [parse](cursor.md#parse)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Cursor**(id?: *`string`*): `any`


*Inherited from INode.__new*

*Defined in /home/ivansglazunov/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:11*



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

*Inherited from [ICursor](../interfaces/icursor.md).[data](../interfaces/icursor.md#data)*

*Defined in [cursor.ts:68](https://github.com/AncientSouls/Cursor/blob/6da6cc9/src/lib/cursor.ts#L68)*





___

<a id="destroy"></a>

### «Static» destroy

**●  destroy**:  *`function`* 

*Inherited from INode.destroy*

*Defined in /home/ivansglazunov/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:15*


#### Type declaration
►(): `void`





**Returns:** `void`






___

<a id="emitter"></a>

### «Static» emitter

**●  emitter**:  *`EventEmitter`* 

*Inherited from IEvents.emitter*

*Defined in /home/ivansglazunov/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/events.d.ts:5*





___

<a id="generateid"></a>

### «Static» generateId

**●  generateId**:  *`function`* 

*Inherited from INode.generateId*

*Defined in /home/ivansglazunov/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:13*


#### Type declaration
►(): `string`





**Returns:** `string`






___

<a id="id"></a>

### «Static» id

**●  id**:  *`string`* 

*Inherited from INode.id*

*Defined in /home/ivansglazunov/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:11*





___

<a id="isdestroyed"></a>

### «Static» isDestroyed

**●  isDestroyed**:  *`boolean`* 

*Inherited from INode.isDestroyed*

*Defined in /home/ivansglazunov/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:14*





___

<a id="query"></a>

### «Static» query

**●  query**:  *`any`* 

*Inherited from [ICursor](../interfaces/icursor.md).[query](../interfaces/icursor.md#query)*

*Defined in [cursor.ts:67](https://github.com/AncientSouls/Cursor/blob/6da6cc9/src/lib/cursor.ts#L67)*





___

<a id="queryid"></a>

### «Static» queryId

**●  queryId**:  *`string`* 

*Inherited from [ICursor](../interfaces/icursor.md).[queryId](../interfaces/icursor.md#queryid)*

*Defined in [cursor.ts:66](https://github.com/AncientSouls/Cursor/blob/6da6cc9/src/lib/cursor.ts#L66)*





___


## Methods
<a id="apply"></a>

### «Static» apply

► **apply**(bundle: *[IBundle](../interfaces/ibundle.md)*): `this`



*Inherited from [ICursor](../interfaces/icursor.md).[apply](../interfaces/icursor.md#apply)*

*Defined in [cursor.ts:70](https://github.com/AncientSouls/Cursor/blob/6da6cc9/src/lib/cursor.ts#L70)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| bundle | [IBundle](../interfaces/ibundle.md)   |  - |





**Returns:** `this`





___

<a id="emit"></a>

### «Static» emit

► **emit**IE(eventName: *`string`*, data: *`IEventsList[IE]`*): `this`



*Inherited from IEvents.emit*

*Defined in /home/ivansglazunov/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/events.d.ts:6*



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



*Inherited from [ICursor](../interfaces/icursor.md).[exec](../interfaces/icursor.md#exec)*

*Defined in [cursor.ts:69](https://github.com/AncientSouls/Cursor/blob/6da6cc9/src/lib/cursor.ts#L69)*



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



*Inherited from [ICursor](../interfaces/icursor.md).[get](../interfaces/icursor.md#get)*

*Defined in [cursor.ts:72](https://github.com/AncientSouls/Cursor/blob/6da6cc9/src/lib/cursor.ts#L72)*



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

*Defined in /home/ivansglazunov/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/events.d.ts:9*



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

*Defined in /home/ivansglazunov/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/events.d.ts:7*



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

*Defined in /home/ivansglazunov/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/events.d.ts:8*



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

► **parse**(bundle: *[IBundle](../interfaces/ibundle.md)*): [IBundleChanges](../interfaces/ibundlechanges.md)



*Inherited from [ICursor](../interfaces/icursor.md).[parse](../interfaces/icursor.md#parse)*

*Defined in [cursor.ts:71](https://github.com/AncientSouls/Cursor/blob/6da6cc9/src/lib/cursor.ts#L71)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| bundle | [IBundle](../interfaces/ibundle.md)   |  - |





**Returns:** [IBundleChanges](../interfaces/ibundlechanges.md)





___


