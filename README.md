weebly-project
==============

####Timeline

Day 1: Get familiar with this project. Read though requirements, F&Q and assets. Think about the architecture for this project, whether use Ember/Angular Frameworks. I was not clear about the requirements, so I send an email to Kate asking about whether keep front-end and backend separately or together as one project. Replied with one project scenario.


Day 2: Set up project structure. Sass as CSS preprocessor, Handlebars as HTML templating system, Browserify as dependency management tool, Express.js for backend development. These could be changed during the development process, not sure if it’ll be better to use a client side frame work Ember.js/Angular. I’ll continue considering this. 

Day 3: Built data store model. Use Mongo DB as database. 

Day 4: Finished basic styling. Top bar, sidebar and page container.

Day 5 - Day 10: Javascript front-end development. There were several times structure reframing. Finally got to an MVC structure.

Day 11 - Day 13: Finished the backend data persistance. 

####Installation

Clone this repo:

`git clone https://github.com/huw30/weebly-project.git`

and then do

`npm install && bower install`

and then

`grunt`

Finally, do `node server`

####Front-End structure


####Server Specification

######Page

`POST /page/new`

Request Body: 
`{name: 'Test'}`  

Response: 

```JSON

{
  "date": 1416108831262,
  "name": "Test",
  "_id": "54681b1fbc0c07020078dbcd",
  "tabId": "54681b1fbc0c07020078dbcd-t",
  "contentId": "54681b1fbc0c07020078dbcd-c"
}

```
----------------------------------------------

`POST /page/:id `

Request Body: 
`{name:TestChangeName}`  

Response: 

```JSON

{
  "success": true
}
```
----------------------------------------------

`DELETE /page/:id `

Response: 

```JSON

{
  "success": true
}
```

----------------------------------------------

`GET /pages `

Response: 

```JSON

[
  {
    "date": 1416108065792,
    "name": "New Page",
    "_id": "54681821d4493a020002ea88",
    "tabId": "54681821d4493a020002ea88-t",
    "contentId": "54681821d4493a020002ea88-c"
  },
  {
    "date": 1416109052499,
    "name": "TEST",
    "_id": "54681bfcbc0c07020078dbce",
    "tabId": "54681bfcbc0c07020078dbce-t",
    "contentId": "54681bfcbc0c07020078dbce-c"
  }
]

```

######Elements

`POST /element/new`

Request Body: 
```JSON
{
  "page":54681821d4493a020002ea88
  "type":text
}
```

Response: 

```JSON

{
  "page": "54681821d4493a020002ea88",
  "type": "text",
  "position": null,
  "content": null,
  "_id": "54681c5ebc0c07020078dbcf"
}

```
----------------------------------------------

`POST /elements `

Request Body: 
```JSON
elements[5468182fd4493a020002ea8a, 54681c5ebc0c07020078dbcf, default]

```

Response: 

```JSON

{
  "success": true
}
```
----------------------------------------------

`PUT /element/:id `

Request Body: 
`{content: "I am a text box"}`  

Response: 

```JSON

{
  "success": true
}
```
----------------------------------------------

`DELETE /element/:id `

Response: 

```JSON

{
  "success": true
}
```

----------------------------------------------

`GET /elements/id `

Response: 

```JSON

[
  {
    "_id": "54681829d4493a020002ea89",
    "content": "",
    "page": "54681821d4493a020002ea88",
    "position": 0,
    "type": "text"
  },
  {
    "_id": "54681c5ebc0c07020078dbcf",
    "content": null,
    "page": "54681821d4493a020002ea88",
    "position": 1,
    "type": "text"
  },
  {
    "_id": "5468182fd4493a020002ea8a",
    "content": null,
    "page": "54681821d4493a020002ea88",
    "position": 2,
    "type": "image"
  }
]

```
