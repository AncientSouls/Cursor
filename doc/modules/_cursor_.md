[ancient-cursor](../README.md) > ["cursor"](../modules/_cursor_.md)



# External module: "cursor"

## Index

### Classes

* [Cursor](../classes/_cursor_.cursor.md)


### Interfaces

* [ICursor](../interfaces/_cursor_.icursor.md)
* [ICursorEventChangedData](../interfaces/_cursor_.icursoreventchangeddata.md)
* [ICursorEventExecData](../interfaces/_cursor_.icursoreventexecdata.md)
* [ICursorEventListener](../interfaces/_cursor_.icursoreventlistener.md)
* [ICursorEventsList](../interfaces/_cursor_.icursoreventslist.md)
* [ICursorWatch](../interfaces/_cursor_.icursorwatch.md)
* [ICursorWatchData](../interfaces/_cursor_.icursorwatchdata.md)


### Type aliases

* [TCursor](_cursor_.md#tcursor)


### Variables

* [MixedCursor](_cursor_.md#mixedcursor)


### Functions

* [apply](_cursor_.md#apply)
* [mixin](_cursor_.md#mixin)
* [watch](_cursor_.md#watch)



---
## Type aliases
<a id="tcursor"></a>

###  TCursor

**Τ TCursor**:  *[ICursor](../interfaces/_cursor_.icursor.md)[ICursorEventsList](../interfaces/_cursor_.icursoreventslist.md)* 

*Defined in [cursor.ts:21](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/cursor.ts#L21)*





___


## Variables
<a id="mixedcursor"></a>

### «Const» MixedCursor

**●  MixedCursor**:  *`TClass`.<[ICursor](../interfaces/_cursor_.icursor.md)[ICursorEventsList](../interfaces/_cursor_.icursoreventslist.md)>*  =  mixin(Node)

*Defined in [cursor.ts:173](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/cursor.ts#L173)*





___


## Functions
<a id="apply"></a>

###  apply

► **apply**(cursor: *`any`*, bundle: *`any`*): `void`



*Defined in [cursor.ts:112](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/cursor.ts#L112)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| cursor | `any`   |  - |
| bundle | `any`   |  - |





**Returns:** `void`





___

<a id="mixin"></a>

###  mixin

► **mixin**T(superClass: *`T`*): `any`



*Defined in [cursor.ts:131](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/cursor.ts#L131)*



**Type parameters:**

#### T :  `TClass`.<`IInstance`>
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| superClass | `T`   |  - |





**Returns:** `any`





___

<a id="watch"></a>

###  watch

► **watch**(__namedParameters: *`object`*, path: *`string`*, listener: *`function`*): `void`



*Defined in [cursor.ts:75](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/cursor.ts#L75)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| __namedParameters | `object`   |  - |
| path | `string`   |  - |
| listener | `function`   |  - |





**Returns:** `void`





___


