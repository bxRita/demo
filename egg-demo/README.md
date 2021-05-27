# demo



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

### egg接收请求参数

#### 1、get请求
```js
let query = this.ctx.query;
let name = query.name;
let id = query.id;
```

#### 2、post请求
```js
let query = this.ctx.request.body;
let name = query.name;
let id = query.id;
```

#### 3、接口返回值
```js
this.ctx.body = {
    code: 0,
    data: '返回的数据',
    msg: '错误数据'
}
```
