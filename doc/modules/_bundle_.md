[ancient-cursor](../README.md) > ["bundle"](../modules/_bundle_.md)



# External module: "bundle"

## Index

### Interfaces

* [IBundle](../interfaces/_bundle_.ibundle.md)
* [IBundleArraySplice](../interfaces/_bundle_.ibundlearraysplice.md)
* [IBundleChanges](../interfaces/_bundle_.ibundlechanges.md)
* [IBundleParser](../interfaces/_bundle_.ibundleparser.md)
* [IBundleParsers](../interfaces/_bundle_.ibundleparsers.md)
* [IBundleSet](../interfaces/_bundle_.ibundleset.md)
* [IBundleUnset](../interfaces/_bundle_.ibundleunset.md)


### Functions

* [get](_bundle_.md#get)
* [prepare](_bundle_.md#prepare)


### Object literals

* [bundleParsers](_bundle_.md#bundleparsers)



---
## Functions
<a id="get"></a>

###  get

► **get**(data: *`any`*, path: *`any`*): `any`



*Defined in [bundle.ts:37](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/bundle.ts#L37)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `any`   |  - |
| path | `any`   |  - |





**Returns:** `any`





___

<a id="prepare"></a>

###  prepare

► **prepare**(container: *`any`*, bundle: *`any`*): `object`



*Defined in [bundle.ts:42](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/bundle.ts#L42)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| container | `any`   |  - |
| bundle | `any`   |  - |





**Returns:** `object`





___


<a id="bundleparsers"></a>

## Object literal: bundleParsers


<a id="bundleparsers.arraysplice"></a>

###  arraySplice

► **arraySplice**(container: *`object`*, bundle: *[IBundleArraySplice](../interfaces/_bundle_.ibundlearraysplice.md)*): `object`



*Defined in [bundle.ts:88](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/bundle.ts#L88)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| container | `object`   |  - |
| bundle | [IBundleArraySplice](../interfaces/_bundle_.ibundlearraysplice.md)   |  - |





**Returns:** `object`





___
<a id="bundleparsers.set"></a>

###  set

► **set**(container: *`object`*, bundle: *[IBundleSet](../interfaces/_bundle_.ibundleset.md)*): `object`



*Defined in [bundle.ts:53](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/bundle.ts#L53)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| container | `object`   |  - |
| bundle | [IBundleSet](../interfaces/_bundle_.ibundleset.md)   |  - |





**Returns:** `object`





___
<a id="bundleparsers.unset"></a>

###  unset

► **unset**(container: *`object`*, bundle: *[IBundleUnset](../interfaces/_bundle_.ibundleunset.md)*): `object`



*Defined in [bundle.ts:70](https://github.com/AncientSouls/Cursor/blob/e099e34/src/lib/bundle.ts#L70)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| container | `object`   |  - |
| bundle | [IBundleUnset](../interfaces/_bundle_.ibundleunset.md)   |  - |





**Returns:** `object`





___


