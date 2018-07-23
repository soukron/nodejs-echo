# nodejs-echo
Simple echo service using NodeJS to be used as an example in some articles.

## Introduction

This is a very minimal Express application which exposes a few endpoints:
  * **/health**, which returns a 200 and a json including a version string:
	```shell
	$ curl http://localhost:8080/health
	{"result":"ok","version":"v1"}
	```

  * **/echo/:msg**, which returns a 200 and a json including the received message:
	```shell
	$ curl http://localhost:8080/echo/Hello
	{"result":"ok","msg":"Hello"}
	```

## Versioning

There are two branches: **v1** and **v2**, which are meant to be the different versions of this API. 

The differences are:
  * *version* string in **/health** is different:
    * *'v1'* for version 1 (v1 branch)
    * *'v2'* for version 2 (v2 branch)
  * **/echo/:msg** endpoint is depreated in v2 so a warning result will be provided and a reason of the warning:
	```shell
	$ curl http://localhost:8080/echo/Hello
	{"result":"warning","reason": "this endpoint is deprecated, use /say instead","msg":"Hello"}
	```
  * **/say/:msg** endpoint is new in v2 which includes some validation about the received message.
	```shell
	$ curl http://localhost:8080/say
    {"result":"error","reason":"No message provided"}
	$ curl http://localhost:8080/say/Hello
	{"result":"ok","msg":"Hello"}
	```

## Deployment

You can deploy and run whatever branch you want in a server or you can deploy them by using a prefix using an environment variable. If this prefix variable (**PREFIX**) is set, all routes will be prepended with it. 

In example, to run **v1** as a main version:
```shell
$ git checkout v1
Switched to branch 'v1'
$ node index.js
API running on http://0.0.0.0:8080
$ curl http://localhost:8080/health
{"result":"ok","version":"v1"}
```

Another example, to run **v2** as main version:
```shell
$ git checkout v2
Switched to branch 'v2'
$ node index.js 
API running on http://0.0.0.0:8080
$ curl http://localhost:8080/health
{"result":"ok","version":"v2"}
```

Finally, to run **v2** as a subpath:
```shell
$ git checkout v2
Switched to branch 'v2'
$ PREFIX=/v2 node index.js 
API running on http://0.0.0.0:8080/v2
$ curl http://localhost:8080/v2/health
{"result":"ok","version":"v2"}
```


