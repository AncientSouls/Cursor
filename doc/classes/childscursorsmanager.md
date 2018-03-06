[ancient-cursor](../README.md) > [ChildsCursorsManager](../classes/childscursorsmanager.md)



# Class: ChildsCursorsManager

## Type parameters
#### IN :  [TCursor](../#tcursor)
#### IEventsList :  [ICursorsManagerEventsList](../interfaces/icursorsmanagereventslist.md)
## Hierarchy


↳  [IChildsCursorsManager](../interfaces/ichildscursorsmanager.md)

**↳ ChildsCursorsManager**







## Indexable

\[key: `string`\]:&nbsp;`any`
## Index

### Constructors

* [constructor](childscursorsmanager.md#constructor)


### Properties

* [Node](childscursorsmanager.md#node)
* [destroy](childscursorsmanager.md#destroy)
* [emitter](childscursorsmanager.md#emitter)
* [generateId](childscursorsmanager.md#generateid)
* [id](childscursorsmanager.md#id)
* [isDestroyed](childscursorsmanager.md#isdestroyed)
* [nodes](childscursorsmanager.md#nodes)


### Methods

* [add](childscursorsmanager.md#add)
* [create](childscursorsmanager.md#create)
* [emit](childscursorsmanager.md#emit)
* [maintain](childscursorsmanager.md#maintain)
* [off](childscursorsmanager.md#off)
* [on](childscursorsmanager.md#on)
* [once](childscursorsmanager.md#once)
* [remove](childscursorsmanager.md#remove)
* [wrap](childscursorsmanager.md#wrap)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new ChildsCursorsManager**(id?: *`string`*): `any`


*Inherited from INode.__new*

*Defined in /home/ivansglazunov/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/node.d.ts:11*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| id | `string`   |  - |





**Returns:** `any`

---


## Properties
<a id="node"></a>

### «Static» Node

**●  Node**:  *`TClass`.<`IN`>* 

*Inherited from IManager.Node*

*Defined in /home/ivansglazunov/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/manager.d.ts:13*





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

<a id="nodes"></a>

### «Static» nodes

**●  nodes**:  *`object`* 

*Inherited from IManager.nodes*

*Defined in /home/ivansglazunov/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/manager.d.ts:14*


#### Type declaration


[id: `string`]: `IN`






___


## Methods
<a id="add"></a>

### «Static» add

► **add**(node: *`IN`*): `this`



*Inherited from IManager.add*

*Defined in /home/ivansglazunov/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/manager.d.ts:17*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| node | `IN`   |  - |





**Returns:** `this`





___

<a id="create"></a>

### «Static» create

► **create**(id?: *`string`*): `IN`



*Inherited from IManager.create*

*Defined in /home/ivansglazunov/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/manager.d.ts:20*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| id | `string`   |  - |





**Returns:** `IN`





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

<a id="maintain"></a>

### «Static» maintain

► **maintain**(path: *`string`*): [ICursorEventListener](../interfaces/icursoreventlistener.md)



*Inherited from [IChildsCursorsManager](../interfaces/ichildscursorsmanager.md).[maintain](../interfaces/ichildscursorsmanager.md#maintain)*

*Defined in [childs-cursors-manager.ts:33](https://github.com/AncientSouls/Cursor/blob/01edbe2/src/lib/childs-cursors-manager.ts#L33)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| path | `string`   |  - |





**Returns:** [ICursorEventListener](../interfaces/icursoreventlistener.md)





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

<a id="remove"></a>

### «Static» remove

► **remove**(node: *`IN`*): `this`



*Inherited from IManager.remove*

*Defined in /home/ivansglazunov/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/manager.d.ts:19*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| node | `IN`   |  - |





**Returns:** `this`





___

<a id="wrap"></a>

### «Static» wrap

► **wrap**(node: *`IN`*): `this`



*Inherited from IManager.wrap*

*Defined in /home/ivansglazunov/dev/packages/ancient-cursor/node_modules/ancient-mixins/lib/manager.d.ts:18*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| node | `IN`   |  - |





**Returns:** `this`





___


