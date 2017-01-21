<p align="center">
  <img alt="node-fence" src="https://cloud.githubusercontent.com/assets/2793951/18944300/f16230ca-8624-11e6-909a-46411104d7f3.png">
</p>

<p align="center">
  <a href="https://travis-ci.org/Slynova-Org/node-fence"><img src="https://img.shields.io/travis/Slynova-Org/node-fence/master.svg?style=flat-square" alt="Build Status"></a>
  <a href="https://coveralls.io/github/Slynova-Org/node-fence?branch=master"><img src="https://img.shields.io/coveralls/Slynova-Org/node-fence/master.svg?style=flat-square" alt="Coverage Status"></a>
  <a href="https://www.npmjs.com/package/node-fence"><img src="https://img.shields.io/npm/v/node-fence.svg?style=flat-square" alt="Version"></a>
  <a href="https://www.npmjs.com/package/node-fence"><img src="https://img.shields.io/npm/dt/node-fence.svg?style=flat-square" alt="Downloads"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/npm/l/node-fence.svg?style=flat-square" alt="License"></a>
</p>

`node-fence` is a framework-agnostic package which provides powerful ACL abilities to [Node.js](https://nodejs.org).<br>
<<<<<<< HEAD
It lets you easily manage ACL with a fluent API easy to learn.

> :pray: This package is under active development, some breaking changes may occur before the first release.

## Table of Contents

 * [Getting Started](#getting-started)
 * [Contribution Guidelines](#contribution-guidelines)
 * [Roadmap](#roadmap)
 * [Change Logs](#change-logs)

## Getting Started

This package is available in the Node Package Repository.<br>
It can easily be installed with `npm`.

```shell
$ npm i --save node-fence
```

When you require the package in your file, it will give you access to the `Guard` class.<br>
This class is a facade for the package and should be instantiated with a [configuration object](#configuration).

```javascript
const Guard = require('node-fence')

let guard = new Guard(config)
```

### Configuration

Instead of explaining you all of the key in the configuration.<br>
I'll let you open the [example file](https://github.com/Slynova-Org/node-fence/blob/master/tests/stubs/config.js) which is used to test this package and read comments.

### API

The API is easy to use and very fluent.<br>

> :point_right: In all of these examples the variable `article` is an object that you can find [in the stubs directory of testing](https://github.com/Slynova-Org/node-fence/blob/master/tests/stubs/article.js).

```javascript
/**
 * This create a new policy allowing the admin roles
 * to create the resource article.
 */
guard.allow('admin').to.create(article)

/**
 * You can also disallow abilities to a role.
 * This is useful depending of your default
 * policy and the precedence parameter.
 *
 * All of these information should be defined in the configuration.
 */
guard.disallow('admin').to.delete(article)

/**
 * A policy can also map only some fields.
 */
guard.allow('member').to.view(article).only(['title', 'content'])
```

After setting all of your policies in a bootstrap file you may want to create condition.<br>
This can be done by using the `can` method of `Guard` with an object.

> :point_right: In all of these examples the variable `user` is an object that you can find [in the stubs directory of testing](https://github.com/Slynova-Org/node-fence/blob/master/tests/stubs/user.js).

```javascript
/**
 * The variable user here is the current connected user.
 */
guard.can(user).create(article)
guard.can(user).update(article)
guard.can(user).view('title').of(article)

// ...
```

=======
It lets you easily manage ACL with a fluent API easy to learn and to work with. :rocket:

> :pray: This package is under active development, some breaking changes may occur before the first release.

<br>
<hr>
<br>

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i --save node-fence
# or
$ yarn add node-fence
```

When you require the package in your file, it will give you access to the `Guard` and `Gate` class.<br>

```javascript
const Guard = require('node-fence').Guard
const Gate = require('node-fence').Gate

const guard = new Guard()
const gate = new Gate()
```

:point_right: [Read the Official Documentation](https://github.com/Slynova-Org/node-fence/wiki)

<br>
>>>>>>> 1.0.0-alpha
## Contribution Guidelines

Any pull requests or discussions are welcome.<br>
Note that every pull request providing new feature or correcting a bug should be created with appropriate unit tests.
<<<<<<< HEAD

## Roadmap

Goals to release the first version (unordered).

 - [ ] Clean the code base
 - [ ] Add `except` for fields
 - [ ] Create dynamic conditions
```javascript
/**
 * If it's needed, you can set a dynamic condition.
 *
 * ownerCondition is here a function defined in the configuration.
 */
guard.allow('member').to.update(member).conditions([ 'ownerCondition' ])

/**
 * Of course, it's possible to define a condition only for some fields.
 */
guard.allow('member').to.view(article).conditions({ 'created_at': 'ownerCondition' })
```
 - [ ] Cleary document all methods
 - [ ] Test every possible use cases and get 100% code coverage

## Change Logs

Nothing will be wrote here before the release of the first version.
=======
>>>>>>> 1.0.0-alpha
