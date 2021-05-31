# demo
本案例是egg连接mysql的一个demo服务


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


### 直接发起 POST 请求会报错

原因：框架内部针对表单 POST 请求均会验证 CSRF 的值，因此我们在表单提交时，请带上 CSRF key 进行提交，可参考[安全威胁csrf的防范](https://eggjs.org/zh-cn/core/security.html#%E5%AE%89%E5%85%A8%E5%A8%81%E8%83%81csrf%E7%9A%84%E9%98%B2%E8%8C%83)

> 注意：上面的校验是因为框架中内置了安全插件 egg-security，提供了一些默认的安全实践，并且框架的安全插件是默认开启的，如果需要关闭其中一些安全防范，直接设置该项的 enable 属性为 false 即可。

> 「除非清楚的确认后果，否则不建议擅自关闭安全插件提供的功能。」

这里在写例子的话可临时在 _config/config.default.js_ 中设置

```js
exports.security = {
  csrf: false
};
```


### egg接收请求参数

#### query
在 URL 中 ? 后面的部分是一个 Query String，这一部分经常用于 GET 类型的请求中传递参数。例如 GET /posts?category=egg&language=node 中 category=egg&language=node 就是用户传递过来的参数。我们可以通过 ctx.query 拿到解析过后的这个参数体

```js
let query = this.ctx.query;
let name = query.name;
let id = query.id;
```

#### queries
有时候我们的系统会设计成让用户传递相同的 key，例如 GET /posts?category=egg&id=1&id=2&id=3。针对此类情况，框架提供了 ctx.queries 对象，这个对象也解析了 Query String，但是它不会丢弃任何一个重复的数据，而是将他们都放到一个数组中：
```js
// GET /posts?category=egg&id=1&id=2&id=3
console.log(this.ctx.queries);
// {
//   category: [ 'egg' ],
//   id: [ '1', '2', '3' ],
// }
```

#### Router params
在 Router 中，我们介绍了 Router 上也可以申明参数，这些参数都可以通过 ctx.params 获取到。
```js
// app.get('/projects/:projectId/app/:appId', 'app.listApp');
// GET /projects/1/app/2
class AppController extends Controller {
  async listApp() {
      assert.equal(this.ctx.params.projectId, '1');
      assert.equal(this.ctx.params.appId, '2');
  }
}
```

#### body

虽然我们可以通过 URL 传递参数，但是还是有诸多限制：

- 浏览器中会对 URL 的长度有所限制，如果需要传递的参数过多就会无法传递。
- 服务端经常会将访问的完整 URL 记录到日志文件中，有一些敏感数据通过 URL 传递会不安全。

在前面的 HTTP 请求报文示例中，我们看到在 header 之后还有一个 body 部分，我们通常会在这个部分传递 POST、PUT 和 DELETE 等方法的参数。一般请求中有 body 的时候，客户端（浏览器）会同时发送 Content-Type 告诉服务端这次请求的 body 是什么格式的。Web 开发中数据传递最常用的两类格式分别是 JSON 和 Form

框架内置了 bodyParser 中间件来对这两类格式的请求 body 解析成 object 挂载到 ctx.request.body 上。HTTP 协议中并不建议在通过 GET、HEAD 方法访问时传递 body，所以我们无法在 GET、HEAD 方法中按照此方法获取到内容。

```js
// POST /api/posts HTTP/1.1
// Host: localhost:3000
// Content-Type: application/json; charset=UTF-8
//
// {"title": "controller", "content": "what is controller"}
class PostController extends Controller {
  async listPosts() {
    assert.equal(this.ctx.request.body.title, 'controller');
    assert.equal(this.ctx.request.body.content, 'what is controller');
  }
}
```

框架对 bodyParser 设置了一些默认参数，配置好之后拥有以下特性：

- 当请求的 Content-Type 为 application/json，application/json-patch+json，application/vnd.api+json 和 application/csp-report 时，会按照 json 格式对请求 body 进行解析，并限制 body 最大长度为 100kb。
- 当请求的 Content-Type 为 application/x-www-form-urlencoded 时，会按照 form 格式对请求 body 进行解析，并限制 body 最大长度为 100kb。
- 如果解析成功，body 一定会是一个 Object（可能是一个数组）。

一般来说我们最经常调整的配置项就是变更解析时允许的最大长度，可以在 config/config.default.js 中覆盖框架的默认值。
```js
module.exports = {
  bodyParser: {
    jsonLimit: '1mb',
    formLimit: '1mb',
  },
};
```


#### 3、接口返回值
```js
this.ctx.body = {
    code: 0,
    data: '返回的数据',
    msg: '错误数据'
}
```

### egg创建、更新mysql数据时，如何获取更新后的对象???
