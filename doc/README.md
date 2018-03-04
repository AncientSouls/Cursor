



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
* [default](#default)
* [get](#get)
* [mixin](#mixin)
* [prepare](#prepare)
* [test](#test)
* [watch](#watch)


### Object literals

* [bundleParsers](#bundleparsers)



---
# Type aliases
<a id="tchildscursorsmanager"></a>

###  TChildsCursorsManager

**Τ TChildsCursorsManager**:  *[IChildsCursorsManager](interfaces/ichildscursorsmanager.md)[TCursor](#tcursor), [ICursorsManagerEventsList](interfaces/icursorsmanagereventslist.md)* 

*Defined in [lib/childs-cursors-manager.ts:29](https://github.com/AncientSouls/Cursor/blob/2cea2ca/src/lib/childs-cursors-manager.ts#L29)*





___

<a id="tcursor"></a>

###  TCursor

**Τ TCursor**:  *[ICursor](interfaces/icursor.md)[ICursorEventsList](interfaces/icursoreventslist.md)* 

*Defined in [lib/cursor.ts:21](https://github.com/AncientSouls/Cursor/blob/2cea2ca/src/lib/cursor.ts#L21)*





___

<a id="tcursorsmanager"></a>

###  TCursorsManager

**Τ TCursorsManager**:  *[ICursorsManager](interfaces/icursorsmanager.md)[TCursor](#tcursor), [ICursorsManagerEventsList](interfaces/icursorsmanagereventslist.md)* 

*Defined in [lib/cursors-manager.ts:27](https://github.com/AncientSouls/Cursor/blob/2cea2ca/src/lib/cursors-manager.ts#L27)*





___


# Variables
<a id="mixedchildscursorsmanager"></a>

### «Const» MixedChildsCursorsManager

**●  MixedChildsCursorsManager**:  *`TClass`.<[TChildsCursorsManager](#tchildscursorsmanager)>*  =  mixin(CursorsManager)

*Defined in [lib/childs-cursors-manager.ts:71](https://github.com/AncientSouls/Cursor/blob/2cea2ca/src/lib/childs-cursors-manager.ts#L71)*





___

<a id="mixedcursor"></a>

### «Const» MixedCursor

**●  MixedCursor**:  *`TClass`.<[ICursor](interfaces/icursor.md)[ICursorEventsList](interfaces/icursoreventslist.md)>*  =  mixin(Node)

*Defined in [lib/cursor.ts:173](https://github.com/AncientSouls/Cursor/blob/2cea2ca/src/lib/cursor.ts#L173)*





___

<a id="mixedcursorsmanager"></a>

### «Const» MixedCursorsManager

**●  MixedCursorsManager**:  *`TClass`.<[TCursorsManager](#tcursorsmanager)>*  =  mixin(Manager)

*Defined in [lib/cursors-manager.ts:57](https://github.com/AncientSouls/Cursor/blob/2cea2ca/src/lib/cursors-manager.ts#L57)*





___


# Functions
<a id="apply"></a>

###  apply

► **apply**(cursor: *`any`*, bundle: *`any`*): `void`



*Defined in [lib/cursor.ts:112](https://github.com/AncientSouls/Cursor/blob/2cea2ca/src/lib/cursor.ts#L112)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cursor | `any`   |  - |
| bundle | `any`   |  - |





**Returns:** `void`





___

<a id="default"></a>

###  default

► **default**(): `void`



*Defined in [tests/bundle.ts:2](https://github.com/AncientSouls/Cursor/blob/2cea2ca/src/tests/bundle.ts#L2)*





**Returns:** `void`





___

<a id="get"></a>

###  get

► **get**(data: *`any`*, path: *`any`*): `any`



*Defined in [lib/bundle.ts:37](https://github.com/AncientSouls/Cursor/blob/2cea2ca/src/lib/bundle.ts#L37)*



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



*Defined in [lib/cursor.ts:131](https://github.com/AncientSouls/Cursor/blob/2cea2ca/src/lib/cursor.ts#L131)*



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



*Defined in [lib/bundle.ts:42](https://github.com/AncientSouls/Cursor/blob/2cea2ca/src/lib/bundle.ts#L42)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| container | `any`   |  - |
| bundle | `any`   |  - |





**Returns:** `object`





___

<a id="test"></a>

###  test

► **test**(path: *`any`*): `void`



*Defined in [tests/childs-cursors-manager.ts:12](https://github.com/AncientSouls/Cursor/blob/2cea2ca/src/tests/childs-cursors-manager.ts#L12)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| path | `any`   |  - |





**Returns:** `void`





___

<a id="watch"></a>

###  watch

► **watch**(__namedParameters: *`object`*, path: *`string`*, listener: *`function`*): `void`



*Defined in [lib/cursor.ts:75](https://github.com/AncientSouls/Cursor/blob/2cea2ca/src/lib/cursor.ts#L75)*



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



*Defined in [lib/bundle.ts:88](https://github.com/AncientSouls/Cursor/blob/2cea2ca/src/lib/bundle.ts#L88)*



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



*Defined in [lib/bundle.ts:53](https://github.com/AncientSouls/Cursor/blob/2cea2ca/src/lib/bundle.ts#L53)*



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



*Defined in [lib/bundle.ts:70](https://github.com/AncientSouls/Cursor/blob/2cea2ca/src/lib/bundle.ts#L70)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| container | `object`   |  - |
| bundle | [IBundleUnset](interfaces/ibundleunset.md)   |  - |





**Returns:** `object`





___


