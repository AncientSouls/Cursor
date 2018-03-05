
# Ancient Souls

#### About urgent trends
Standards, protocols and libraries are usually implemented for a specific task, taking into account the minimum required capacity in strict dependence on the situation. Because of this, the expansion and flexible application of such solutions is very expensive or impossible.

##### Reason.

If you perceive any business or project as a tree, then today usually first come up with the leaves of the project, and under them try to grow branches to the ground. This leads to the fact that if the leaves need more to do almost the full path from the top down or create crutches in the architecture.

##### Solution

Grow roots. To the extent possible, if we can add an exclusively decorative (layout, final logic, content, adapters) code to get the final product, create it. Do not create projects where basic logic will require more than 10% additional code. The process of creating root, fundamental capabilities, potential opportunities must be based on the algorithm for finding duplicate potentials, and not from the need to create any final product.

We conduct research and identify the most repetitive conceptual patterns in different modules used in one application, we study the reasons why these concepts are duplicated. We create a flexible modular implementation allowing with minimal additions to get from it the same effect with much more flexibility.

We believe that having such opportunities, we can start and create, potentially, at least 250% more end products.

#### Our mission
Creating modules with the widest possible application potential.

- If subscribing to changes, then without dependence on the method, protocol or data structure, with the ability to determine these factors is absolutely free.
- If the communication system is applicable for the transmission of any type of content, with any degree of synchronization and using any communication protocol, the same one programm interface.
- If the mounting concept, then fully reactively, without dependence to language, source type or execution platform

#### Comparison
Existing systems vs possible assemblies based on our abstractions.

- meteor.js subscribe/publish = [[Peer]]+[[Channels]]+[[Cursor]] (80%) + adapters (20%)
- webpack = [[Funicular]]+[[Cursor]] (80%) + adapters (20%)
- react = [[Funicular]]+[[Cursor]] (50%) + dom/string generator
- meteor.js minimongo = [[Cursor]] + mingo
- meteor.js methods = [[Peer]]+[[Channels]]+[[Cursor]] (95%)

#### Road

- [https://github.com/AncientSouls/Cursor](Cursor) - Abstract container of data synchronization.
- [https://github.com/AncientSouls/Channels](Channels) - Abstract modular channels concept.
  - Still need to create many adapters for popular communication protocols.
- [https://github.com/AncientSouls/Peer](Peer) - Friendly core of interaction of peers.
- [https://github.com/AncientSouls/Funicular](Funicular) - Abstract hierarchical life cycle of the mount.
  - Still need to create adapters for specific formats of executable data (js / css / html / static ... + compilatable formats as coffee / ts ...)
- Coming soon: SQL tracking of change of SELECT results, without client data meaning
- Coming soon: SQL graph store model (based on many models as nested sets and others...) with support recursives and multiparents, may be adaptive to data... may be

#### We invite you!

We are looking for those who share our values, and those who can reasonably criticize and challenge them. If you are one of these people, please write us an issue and post with any thoughts, questions and ideas.


## Index

### Classes

* [ChildsCursorsManager](classes/childscursorsmanager.md)
* [Cursor](classes/cursor.md)
* [CursorsManager](classes/cursorsmanager.md)


### Interfaces

* [IBundle](interfaces/ibundle.md)
* [IBundleArraySplice](interfaces/ibundlearraysplice.md)
* [IBundleChanges](interfaces/ibundlechanges.md)
* [IBundleParser](interfaces/ibundleparser.md)
* [IBundleParsers](interfaces/ibundleparsers.md)
* [IBundleSet](interfaces/ibundleset.md)
* [IBundleUnset](interfaces/ibundleunset.md)
* [IChildsCursorsManager](interfaces/ichildscursorsmanager.md)
* [ICursor](interfaces/icursor.md)
* [ICursorBundle](interfaces/icursorbundle.md)
* [ICursorEventChangedData](interfaces/icursoreventchangeddata.md)
* [ICursorEventExecData](interfaces/icursoreventexecdata.md)
* [ICursorEventListener](interfaces/icursoreventlistener.md)
* [ICursorEventsList](interfaces/icursoreventslist.md)
* [ICursorWatch](interfaces/icursorwatch.md)
* [ICursorWatchData](interfaces/icursorwatchdata.md)
* [ICursorsManager](interfaces/icursorsmanager.md)
* [ICursorsManagerChangedEventData](interfaces/icursorsmanagerchangedeventdata.md)
* [ICursorsManagerEventsList](interfaces/icursorsmanagereventslist.md)
* [ICursorsManagerExecEventData](interfaces/icursorsmanagerexeceventdata.md)


### Type aliases

* [TChildsCursorsManager](#tchildscursorsmanager)
* [TCursor](#tcursor)
* [TCursorsManager](#tcursorsmanager)


### Variables

* [MixedChildsCursorsManager](#mixedchildscursorsmanager)
* [MixedCursor](#mixedcursor)
* [MixedCursorsManager](#mixedcursorsmanager)


### Functions

* [apply](#apply)
* [get](#get)
* [mixin](#mixin)
* [prepare](#prepare)
* [watch](#watch)


### Object literals

* [bundleParsers](#bundleparsers)



---
# Type aliases
<a id="tchildscursorsmanager"></a>

###  TChildsCursorsManager

**Τ TChildsCursorsManager**:  *[IChildsCursorsManager](interfaces/ichildscursorsmanager.md)[TCursor](#tcursor), [ICursorsManagerEventsList](interfaces/icursorsmanagereventslist.md)* 

*Defined in [childs-cursors-manager.ts:29](https://github.com/AncientSouls/Cursor/blob/a4fb998/src/lib/childs-cursors-manager.ts#L29)*





___

<a id="tcursor"></a>

###  TCursor

**Τ TCursor**:  *[ICursor](interfaces/icursor.md)[ICursorEventsList](interfaces/icursoreventslist.md)* 

*Defined in [cursor.ts:21](https://github.com/AncientSouls/Cursor/blob/a4fb998/src/lib/cursor.ts#L21)*





___

<a id="tcursorsmanager"></a>

###  TCursorsManager

**Τ TCursorsManager**:  *[ICursorsManager](interfaces/icursorsmanager.md)[TCursor](#tcursor), [ICursorsManagerEventsList](interfaces/icursorsmanagereventslist.md)* 

*Defined in [cursors-manager.ts:27](https://github.com/AncientSouls/Cursor/blob/a4fb998/src/lib/cursors-manager.ts#L27)*





___


# Variables
<a id="mixedchildscursorsmanager"></a>

### «Const» MixedChildsCursorsManager

**●  MixedChildsCursorsManager**:  *`TClass`.<[TChildsCursorsManager](#tchildscursorsmanager)>*  =  mixin(CursorsManager)

*Defined in [childs-cursors-manager.ts:71](https://github.com/AncientSouls/Cursor/blob/a4fb998/src/lib/childs-cursors-manager.ts#L71)*





___

<a id="mixedcursor"></a>

### «Const» MixedCursor

**●  MixedCursor**:  *`TClass`.<[ICursor](interfaces/icursor.md)[ICursorEventsList](interfaces/icursoreventslist.md)>*  =  mixin(Node)

*Defined in [cursor.ts:173](https://github.com/AncientSouls/Cursor/blob/a4fb998/src/lib/cursor.ts#L173)*





___

<a id="mixedcursorsmanager"></a>

### «Const» MixedCursorsManager

**●  MixedCursorsManager**:  *`TClass`.<[TCursorsManager](#tcursorsmanager)>*  =  mixin(Manager)

*Defined in [cursors-manager.ts:57](https://github.com/AncientSouls/Cursor/blob/a4fb998/src/lib/cursors-manager.ts#L57)*





___


# Functions
<a id="apply"></a>

###  apply

► **apply**(cursor: *`any`*, bundle: *`any`*): `void`



*Defined in [cursor.ts:112](https://github.com/AncientSouls/Cursor/blob/a4fb998/src/lib/cursor.ts#L112)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cursor | `any`   |  - |
| bundle | `any`   |  - |





**Returns:** `void`





___

<a id="get"></a>

###  get

► **get**(data: *`any`*, path: *`any`*): `any`



*Defined in [bundle.ts:37](https://github.com/AncientSouls/Cursor/blob/a4fb998/src/lib/bundle.ts#L37)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `any`   |  - |
| path | `any`   |  - |





**Returns:** `any`





___

<a id="mixin"></a>

###  mixin

► **mixin**T(superClass: *`T`*): `any`



*Defined in [cursor.ts:131](https://github.com/AncientSouls/Cursor/blob/a4fb998/src/lib/cursor.ts#L131)*



**Type parameters:**

#### T :  `TClass`.<`IInstance`>
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| superClass | `T`   |  - |





**Returns:** `any`





___

<a id="prepare"></a>

###  prepare

► **prepare**(container: *`any`*, bundle: *`any`*): `object`



*Defined in [bundle.ts:42](https://github.com/AncientSouls/Cursor/blob/a4fb998/src/lib/bundle.ts#L42)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| container | `any`   |  - |
| bundle | `any`   |  - |





**Returns:** `object`





___

<a id="watch"></a>

###  watch

► **watch**(__namedParameters: *`object`*, path: *`string`*, listener: *`function`*): `void`



*Defined in [cursor.ts:75](https://github.com/AncientSouls/Cursor/blob/a4fb998/src/lib/cursor.ts#L75)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| __namedParameters | `object`   |  - |
| path | `string`   |  - |
| listener | `function`   |  - |





**Returns:** `void`





___


<a id="bundleparsers"></a>

## Object literal: bundleParsers


<a id="bundleparsers.arraysplice"></a>

###  arraySplice

► **arraySplice**(container: *`object`*, bundle: *[IBundleArraySplice](interfaces/ibundlearraysplice.md)*): `object`



*Defined in [bundle.ts:88](https://github.com/AncientSouls/Cursor/blob/a4fb998/src/lib/bundle.ts#L88)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| container | `object`   |  - |
| bundle | [IBundleArraySplice](interfaces/ibundlearraysplice.md)   |  - |





**Returns:** `object`





___
<a id="bundleparsers.set"></a>

###  set

► **set**(container: *`object`*, bundle: *[IBundleSet](interfaces/ibundleset.md)*): `object`



*Defined in [bundle.ts:53](https://github.com/AncientSouls/Cursor/blob/a4fb998/src/lib/bundle.ts#L53)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| container | `object`   |  - |
| bundle | [IBundleSet](interfaces/ibundleset.md)   |  - |





**Returns:** `object`





___
<a id="bundleparsers.unset"></a>

###  unset

► **unset**(container: *`object`*, bundle: *[IBundleUnset](interfaces/ibundleunset.md)*): `object`



*Defined in [bundle.ts:70](https://github.com/AncientSouls/Cursor/blob/a4fb998/src/lib/bundle.ts#L70)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| container | `object`   |  - |
| bundle | [IBundleUnset](interfaces/ibundleunset.md)   |  - |





**Returns:** `object`





___


