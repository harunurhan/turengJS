# turengJS

This is an unofficial node module and command line tool for tureng.com. It allows to search a turkish-english word from your node app and command line (must be installed globally)


## ?

This module does not have really good implementation because I am new to nodeJS and I have never done something with jQuery before. I did it to have a little bit jQuery and npm.


## Dependencies

Since, tureng.com does not provide an open API. It uses [request](https://github.com/request/request) to send request and [cheerio](https://github.com/cheeriojs/cheerio) to parse html.

## Install

`npm install turengjs` to use in your node projects or add it to package.json then `require('turengjs')` anywhere in the app.


`npm intall -g turengjs` to use from directly command line.


## Usage

as a command line tool: `$ tureng <word>`

as a module:

~~~
var tureng = require('turengjs');
tureng('a word', function(error, data) {
    if(!error) {
      // do sometihng with data
    }
});
~~~

### Module Return Format
Example result:
~~~
{
   "categories":[
      {
         "name":"Common Usage",
         "results":[
            {
               "type":"adj.",
               "english":"elegant",
               "turkish":"zarif"
            },
            {
               "type":"adj.",
               "english":"elegant",
               "turkish":"şık"
            }
         ]
      },
      {
         "name":"General",
         "results":[
            {...}
            ...
         ]
      }
      ...
    ] 
~~~



