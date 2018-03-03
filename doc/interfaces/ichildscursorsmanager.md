[ancient-cursor](../README.md) > [IChildsCursorsManager](../interfaces/ichildscursorsmanager.md)



# Interface: IChildsCursorsManager

## Type parameters
#### IN :  [TCursor](../#tcursor)
#### IEventsList :  [ICursorsManagerEventsList](icursorsmanagereventslist.md)
## Hierarchy


↳  [ICursorsManager](icursorsmanager.md)`IN`, `IEventsList`

**↳ IChildsCursorsManager**

↳  [ChildsCursorsManager](../classes/childscursorsmanager.md)










## Indexable

\[key: `string`\]:&nbsp;`any`

## Constructors
<a id="constructor"></a>


### ⊕ **new IChildsCursorsManager**(id?: *`string`*): `any`


*Inherited from INode.__new*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:11*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| id | `string`   |  - |





**Returns:** `any`

---


## Properties
<a id="node"></a>

###  Node

**●  Node**:  *`TClass`.<`IN`>* 

*Inherited from IManager.Node*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/manager.d.ts:13*





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

<a id="nodes"></a>

###  nodes

**●  nodes**:  *`object`* 

*Inherited from IManager.nodes*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/manager.d.ts:14*


#### Type declaration


[id: `string`]: `IN`






___


## Methods
<a id="add"></a>

###  add

► **add**(node: *`IN`*): `this`



*Inherited from IManager.add*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/manager.d.ts:17*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| node | `IN`   |  - |





**Returns:** `this`





___

<a id="create"></a>

###  create

► **create**(id?: *`string`*): `IN`



*Inherited from IManager.create*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/manager.d.ts:20*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| id | `string`   |  - |





**Returns:** `IN`





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

<a id="maintain"></a>

###  maintain

► **maintain**(path: *`string`*): [ICursorEventListener](icursoreventlistener.md)



*Defined in [lib/childs-cursors-manager.ts:33](https://github.com/AncientSouls/Cursor/blob/b31dcfc/src/lib/childs-cursors-manager.ts#L33)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| path | `string`   |  - |





**Returns:** [ICursorEventListener](icursoreventlistener.md)





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

<a id="remove"></a>

###  remove

► **remove**(node: *`IN`*): `this`



*Inherited from IManager.remove*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/manager.d.ts:19*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| node | `IN`   |  - |





**Returns:** `this`





___

<a id="wrap"></a>

###  wrap

► **wrap**(node: *`IN`*): `this`



*Inherited from IManager.wrap*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/manager.d.ts:18*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| node | `IN`   |  - |





**Returns:** `this`





___


