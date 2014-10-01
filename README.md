PDL
===

a mini language to describe parameterized url-style paths for use in routers and url generators

#What does this thing do?
on it"s own, not much. It lets you take descriptive strings, or schema objects and compile them into pathData objects which can be used to make things such as url generators and matchers

```
var pathString = "/static/*path"

var schema = {
	"path":"/wine/:id/:field?",
	"params":{
		"id":{
			"regex":"\d\d\d\d\d\d\d\d"
		},
		"field":{
			"values":["price","age","vintage"]
		}
	}
};

var path1 = pdl.compilePath(pathString)
var path2 = pdl.compilePath(schema)

```

#so how does the language work?
A path is a string which looks like a url path, e.g. "/home/root/beer." A path consists of tokens, each token is preceeded by a /. Tokens can either be regular strings or parameters, and the final token can be a "splat" which represents a number of trailing tokens. Parameters and splats can be made optional.

To make a token a parameter preceed it with a ':' to make a token a splat, preceed it with a '*' and to make either a parameter or a splat optional follow it with a question mark.

as an example in the path "/static/:type/:subtype?/*path" type is a parameter, subtype is an optional parameter, and path is a splat.

#what do pathData objects look like?
the compilation of a path gets you a list of objects that can look a few different ways, if a token is a single value you will get:
```
{
	"type":"value",
	"val":[[the value from the path]],
	"matches": a function that will return true with the input is equal to the value
}
```

if the token is a parameter you will get:

```
{
	"type":"param",
	"name":the name of the parameter taken from the path string,
	"matches": a function that either returns true for anything, or a more specific matcher (see below),
	"isOptional": true if this is an optional param, false otherwise
}
```

and if the token is a splat you will get:
```
{
	"type":"splat",
	"name":the name of the splat taken from the path string,
	"isOptional": true if this is an optional slpat, false otherwise
}
```

#how do I restrict what kind of values will match a param?
by using a schema! A schema is a POJSO with the following fields

1. path, a string written in the path description language
2. params, a map from parameter name to a matcher specification, which restricts the values that will match that param

if no matcher is specified, any value will match the param

#what kind of matchers are there?
out of the box there are:

1. regex: which takes a string that defines a regular expression matching values must match
2. values: which takes an array of values, one of which matching values must match

there are also two pseudo matchers, value and whatever, which are used for when you have either a non-parameter token or a param with no matcher specified.

you can also add new param matchers if your application needs them by writing to the exported param matchers object.

#what else does this thing export?
in order to help build things the PDL module exports 3 things

1. the compilePath function, which takes a string or schema and returns a pathData object
2. the tokenizer, which is the function that the PDL uses to break a path into tokens (it's basically jsut string.split('/'))
3. the param matchers, which are rules used to match a parameter, this can be used to extend the PDLs matching function

