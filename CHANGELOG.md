#### 0.0.32 (2017-4-21)

##### Documentation Changes

* **jsdoc:**
  * some fixes ([c8c0398c](https://github.com/AncientSouls/Graph/commit/c8c0398c485a4c9235ca41703f04c6b6a8acfff5))
  * Return optional count ([03bfc93a](https://github.com/AncientSouls/Graph/commit/03bfc93aefc16aab0850b17de3f4259bab2bf110))
  * id, source, target can be string|number|string[]|number[] ([f96ac674](https://github.com/AncientSouls/Graph/commit/f96ac674518324043c697cdfe8cfb92caf689ebe))
  * Import description. ([36500b82](https://github.com/AncientSouls/Graph/commit/36500b82ce3eb3ec544409c14523e90f9893aab2))
  * ObjectGraph is inherited class. ([d9ca0859](https://github.com/AncientSouls/Graph/commit/d9ca08592226dcb216af2cccd4489385f785c9cf))
  * ObjectGraph support and jsdoc.json enhanced ([137cb3fd](https://github.com/AncientSouls/Graph/commit/137cb3fd7b00104bbfc22f2b1a04ce78ad84b1bc))
* **readme:**
  * Compile before testing ([3275d126](https://github.com/AncientSouls/Graph/commit/3275d1267b37ffc469d737a476a88ee900f2b7df))
  * Update import. ([7406f96d](https://github.com/AncientSouls/Graph/commit/7406f96d96769feb63a6a45d3fc064ae1bd247af))
  * Fix readme and logic ([092920c8](https://github.com/AncientSouls/Graph/commit/092920c8e004773996a4bfb4350b256d66d7f145))
  * new syntax fix ([c2c53f5a](https://github.com/AncientSouls/Graph/commit/c2c53f5ac16b21f1d35906aef9ffe9dae8e2f3e5))
  * new beautifuls ([ad11882c](https://github.com/AncientSouls/Graph/commit/ad11882c9ecd4ae7e7ff2f5600f8c03425f3c91f))
  * little console.log fix ([7490e13d](https://github.com/AncientSouls/Graph/commit/7490e13d081764965f508353ec16e9c02ad86bb0))
  * new format for code and comments ([8ebebed3](https://github.com/AncientSouls/Graph/commit/8ebebed35690e18e9e1f90eb6b9f09a93a6d7126))

##### New Features

* **events:** Stops subscription support. ([f04c745b](https://github.com/AncientSouls/Graph/commit/f04c745b7043f448cd8e65c076fbb051c590b18f))
* **graph:**
  * graph.get method ([0b1a1167](https://github.com/AncientSouls/Graph/commit/0b1a1167261bd3939f2cf64863bf5c1ea2f60491))
  * constructor argument config ([7f8c47c6](https://github.com/AncientSouls/Graph/commit/7f8c47c6eeae4f5e292cde71a620b0c0a136dab6))
  * count method ([1747a4a8](https://github.com/AncientSouls/Graph/commit/1747a4a8eaef4584c2f48f792a5c35e89110d362))
  * factory for custom class construction ([2a25d0d4](https://github.com/AncientSouls/Graph/commit/2a25d0d4106e65a135ce381e7be45106a9c471b7))
  * last argument context for custom user data ([9e24adf2](https://github.com/AncientSouls/Graph/commit/9e24adf279f5009090e49d4c5069c3fee1ba50ab))
  * array push, add, remove operators ([1013834b](https://github.com/AncientSouls/Graph/commit/1013834b8356794504fd2bed9416c3ce500f03df))
  * Hipergraphs. Support for multiple values in selectors and modifiers. ([4b36d2c0](https://github.com/AncientSouls/Graph/commit/4b36d2c036a07d5e97fc144d2dfafcf4f71b11ef))
* **adapter:** idGenerator for custom ids in links ([84e0e60e](https://github.com/AncientSouls/Graph/commit/84e0e60eb8f71a6da60384694e8ae47e48e9d5a5))
* **git:** Move doc into submodule ([451b6420](https://github.com/AncientSouls/Graph/commit/451b6420bd5c1a29f6ad0b4f204c7b9ad5898c97))
* **scripts:** npm run compile && npm test && npm publish && npm run cleaning && git push ([2fb0c6cb](https://github.com/AncientSouls/Graph/commit/2fb0c6cbf453bee859b30cfe616f402b91520b36))
* **tests:** Separate complete, imcomplete and empty links tests. ([b3c06f9c](https://github.com/AncientSouls/Graph/commit/b3c06f9cad9b2832c8f13b39c25393a143d3dde7))

##### Bug Fixes

* **package:**
  * wrong dep ([725ff7d3](https://github.com/AncientSouls/Graph/commit/725ff7d3356a29fafd9cb9accf0a2f10f5938fb9))
  * Not need to compile after install ([c375b544](https://github.com/AncientSouls/Graph/commit/c375b5440b0d88606c3cc593d59922271f7660f7))
* **scripts:**
  * useless ([df7382ce](https://github.com/AncientSouls/Graph/commit/df7382ce6843dde39bc9a6c8835c594f50c24209))
  * submodule branch checkout ([05aa2dac](https://github.com/AncientSouls/Graph/commit/05aa2dacb316cd2b812ac64b451bfa872dcaa410))
  * Add to jsdoc script submodule update. ([b662e463](https://github.com/AncientSouls/Graph/commit/b662e463dcf5835bdba2595191972fdf41ef9a75))
  * from path to bin names ([59f4b469](https://github.com/AncientSouls/Graph/commit/59f4b469377140ead35112d359b750e61182d573))
* **graph:**
  * update constructor validation ([886708d3](https://github.com/AncientSouls/Graph/commit/886708d35455fc967685388a2fb71d8804a4e813))
  * ParentClass for main Graph class ([6ce8044b](https://github.com/AncientSouls/Graph/commit/6ce8044b788b871a241eb59688687a8e8c26c801))
* **readme:** npm run compile already in npm test ([e80c81ad](https://github.com/AncientSouls/Graph/commit/e80c81adce8dfd5b9fb9809091b1ef11633acd61))
* **adapter:**
  * in get method callback is not defined ([401c7c14](https://github.com/AncientSouls/Graph/commit/401c7c143b6816e5d4ecd9bac8df91283b25ab1c))
  * empty array if empty field ([1bfcbe85](https://github.com/AncientSouls/Graph/commit/1bfcbe85e0993d97473508fbd85ac8cc2638280a))
  * remove event only if removed... ([7f1f8bc9](https://github.com/AncientSouls/Graph/commit/7f1f8bc904c46573155cb753a7e5b719d32fbeae))
  * remove event only after removing ([b3c96e78](https://github.com/AncientSouls/Graph/commit/b3c96e786e0c74855c340f822117eebea26db7c7))
  * Catch undefined doc in array. ([9e9029ec](https://github.com/AncientSouls/Graph/commit/9e9029ecbbce38d94d042f90fdec8788a8b63e6e))
  * Callback optional call ([ef09f31d](https://github.com/AncientSouls/Graph/commit/ef09f31d6261ed576f523528628021c482ef36b5))
  * Move callback out from try/catch This led to catching the error inside the callback. ([56ee556c](https://github.com/AncientSouls/Graph/commit/56ee556c429cd0ad3b6914c9b2b46ff2528f0a36))
  * Cleaning and fix query by id result. ([4abf1129](https://github.com/AncientSouls/Graph/commit/4abf1129c8b28dc219b5da0b48936f4ee4eb760b))
  * Fix document to link generation. ([da90f46d](https://github.com/AncientSouls/Graph/commit/da90f46d762f9662036e56676e24ab44571d63b3))
* **jsdoc:**
  * arguments ([e829c1a2](https://github.com/AncientSouls/Graph/commit/e829c1a251bb459123c172c2416c5b327a303d6f))
  * syntax ([8792bdc3](https://github.com/AncientSouls/Graph/commit/8792bdc3cd4be3d5e1eb95281e76401f5a6ba6d4))
  * Restore jsdoc.conf.json file. ([7e358b54](https://github.com/AncientSouls/Graph/commit/7e358b540f384d19be8e414eac6437352a50e75d))
  * Move jsdoc settings into gh-pages branch. ([a479f12c](https://github.com/AncientSouls/Graph/commit/a479f12cc2c57dd26ee76030141b70b4fdc3d40c))
* **compile:** Remove old compiled files. Need to automate these processes... ([bf4a2fd8](https://github.com/AncientSouls/Graph/commit/bf4a2fd80936ce0befa6a3a0b9e3ab9fde978eed))
* **tests:** Added before preparation. ([ddc15d01](https://github.com/AncientSouls/Graph/commit/ddc15d014b711dcd6d53fd967d865270af00983b))
* **npm:** Move chai and mocha into main dependencies It is necessary to run tests from other packages. ([10021b6b](https://github.com/AncientSouls/Graph/commit/10021b6bdd03b27ebdfbcbd8a9b2cc11db72710b))

##### Other Changes

* **adapter:** _idGenerator && _insertModifier && _updateModifier && skip && limit && sort ([6260cc68](https://github.com/AncientSouls/Graph/commit/6260cc68a56101fe54f357b25a9a49d7b7ce2ec9))

##### Refactors

* **export:** Export in separate line. ([007ba44f](https://github.com/AncientSouls/Graph/commit/007ba44f2fba8032eafc0b837910f4de2d15692e))

