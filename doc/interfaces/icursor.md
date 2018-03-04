[ancient-cursor](../README.md) > [ICursor](../interfaces/icursor.md)



# Interface: ICursor

## Type parameters
#### IEventsList :  [ICursorEventsList](icursoreventslist.md)
## Hierarchy


 `INode`.<`IEventsList`>

**↳ ICursor**

↳  [Cursor](../classes/cursor.md)










## Indexable

\[key: `string`\]:&nbsp;`any`

## Constructors
<a id="constructor"></a>


### ⊕ **new ICursor**(id?: *`string`*): `any`


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

###  data

**●  data**:  *`any`* 

*Defined in [cursor.ts:68](https://github.com/AncientSouls/Cursor/blob/72c569d/src/lib/cursor.ts#L68)*





___

<a id="destroy"></a>

###  destroy

**●  destroy**:  *`function`* 

*Inherited from INode.destroy*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:15*


#### Type declaration
►(): `void`





**Returns:** `void`






___

<a id="emitter"></a>

###  emitter

**●  emitter**:  *`EventEmitter`* 

*Inherited from IEvents.emitter*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/events.d.ts:5*





___

<a id="generateid"></a>

###  generateId

**●  generateId**:  *`function`* 

*Inherited from INode.generateId*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:13*


#### Type declaration
►(): `string`





**Returns:** `string`






___

<a id="id"></a>

###  id

**●  id**:  *`string`* 

*Inherited from INode.id*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:11*





___

<a id="isdestroyed"></a>

###  isDestroyed

**●  isDestroyed**:  *`boolean`* 

*Inherited from INode.isDestroyed*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:14*





___

<a id="query"></a>

###  query

**●  query**:  *`any`* 

*Defined in [cursor.ts:67](https://github.com/AncientSouls/Cursor/blob/72c569d/src/lib/cursor.ts#L67)*





___

<a id="queryid"></a>

###  queryId

**●  queryId**:  *`string`* 

*Defined in [cursor.ts:66](https://github.com/AncientSouls/Cursor/blob/72c569d/src/lib/cursor.ts#L66)*





___


## Methods
<a id="apply"></a>

###  apply

► **apply**(bundle: *[IBundle](ibundle.md)*): `this`



*Defined in [cursor.ts:70](https://github.com/AncientSouls/Cursor/blob/72c569d/src/lib/cursor.ts#L70)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| bundle | [IBundle](ibundle.md)   |  - |





**Returns:** `this`





___

<a id="emit"></a>

###  emit

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

###  exec

► **exec**(query: *`any`*, data?: *`any`*): `this`



*Defined in [cursor.ts:69](https://github.com/AncientSouls/Cursor/blob/72c569d/src/lib/cursor.ts#L69)*



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



*Defined in [cursor.ts:72](https://github.com/AncientSouls/Cursor/blob/72c569d/src/lib/cursor.ts#L72)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| path | `string`   |  - |





**Returns:** `any`





___

<a id="off"></a>

###  off

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

###  on

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

###  once

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

###  parse

► **parse**(bundle: *[IBundle](ibundle.md)*): [IBundleChanges](ibundlechanges.md)



*Defined in [cursor.ts:71](https://github.com/AncientSouls/Cursor/blob/72c569d/src/lib/cursor.ts#L71)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| bundle | [IBundle](ibundle.md)   |  - |





**Returns:** [IBundleChanges](ibundlechanges.md)





___


