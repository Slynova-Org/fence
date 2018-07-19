<p align="center">
  <img alt="fence" src="https://user-images.githubusercontent.com/2793951/28426832-a49b1e36-6d74-11e7-906c-76de04742d39.png">
</p>

<p align="center">
  <a href="https://travis-ci.org/Slynova-Org/fence"><img src="https://img.shields.io/travis/Slynova-Org/fence/master.svg?style=flat-square" alt="Build Status"></a>
  <a href="https://coveralls.io/github/Slynova-Org/fence?branch=master"><img src="https://img.shields.io/coveralls/Slynova-Org/fence/master.svg?style=flat-square" alt="Coverage Status"></a>
  <a href="https://www.npmjs.com/package/@slynova/fence"><img src="https://img.shields.io/npm/v/@slynova/fence.svg?style=flat-square" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@slynova/fence"><img src="https://img.shields.io/npm/dt/@slynova/fence.svg?style=flat-square" alt="Downloads"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/npm/l/@slynova/fence.svg?style=flat-square" alt="License"></a>
</p>

`fence` is a framework-agnostic package which provides powerful ACL abilities to JavaScript.<br>
It lets you easily manage ACL with a fluent API easy to learn and to work with. :rocket:

<hr>
<br>

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @slynova/fence
# or
$ yarn add @slynova/fence
```

When you require the package in your file, it will give you access to the `Guard` and `Gate` class.<br>

```javascript
const { Gate, Guard } = require('@slynova/fence')
```

<br>

## Gate & Policy

A `Gate` is a closure that returns a boolean to determine if the user is allowed to perform a certain action.
Instead of using a closure, you can also write a `Policy`. Those are classes that let you organise your authorisation around a particular model or resource.

### Writing a Gate

To define a new Gate you will need to call the `define` method on the `Gate` facade.

```js
Gate.define('name-of-the-gate', async (user, resource) => {
  // Payload
  // e.g. return user.id === resource.author_id
})
```

### Writing a Policy

To define a new Policy you will need to call the `policy` method on the `Gate` facade.

```js
Gate.policy(post, PostPolicy)
```

The first argument is the object you want to define the policy for. It can be a [simple JSON](https://github.com/Slynova-Org/node-fence/blob/master/tests/stubs/post.json) or an [ES2015 class](https://github.com/Slynova-Org/node-fence/blob/master/tests/stubs/Post.js).

The policy must be an [ES2015 class](https://github.com/Slynova-Org/node-fence/blob/master/tests/stubs/PostPolicy.js).

<br>

## Guard

The `Guard` is the guardian of your gates.

Most of the time, you'll want to use the authenticated user to test your gates. For this reason, `node-fence` let you use the method `Guard.setDefaultUser()`.

```js
// The user can be retrieve from the auth middleware you are using
const guard = Guard.setDefaultUser({ id: 1, username: 'romainlanz' })
```

### Public API

```js
guard.allows('gateName/Policy Method', resource) // It will use per default the defined user or return false if not defined
guard.denies('gateName/Policy Method', resource) // It will use per default the defined user or return true if not defined
guard.allows('gateName/Policy Method', resource, user)
guard.denies('gateName/Policy Method', resource, user)
guard.can(user).pass('gateName').for(resource)
guard.can(user).callPolicy('Policy Method', resource)
```

<br>

## Contribution Guidelines

Any pull requests or discussions are welcome.<br>
Note that every pull request providing a new feature or correcting a bug should be created with appropriate unit tests.
