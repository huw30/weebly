weebly-project
==============

####Timeline

Day 1: Get familiar with this project. Read though requirements, F&Q and assets. Think about the architecture for this project, whether use Ember/Angular Frameworks. I was not clear about the requirements, so I send an email to Kate asking about whether keep front-end and backend separately or together as one project. Replied with one project scenario.


Day 2: Set up project structure. Sass as CSS preprocessor, Handlebars as HTML templating system, Browserify as dependency management tool, Express.js for backend development. These could be changed during the development process, not sure if it’ll be better to use a client side frame work Ember.js/Angular. I’ll continue considering this. 



####Server Specification

All requests must return valid JSON in the following protocol.

#####Elements: 
 
 `GET /elements/:page`   
 
 Response: 
 
 `order by 'order'`
 
 ```JSON
{
  "{elements}": [
    {
      "id":"{elementId}",
      "property":"{element property}",
      "...": "..."
    },
    {"...": "..."}
  ]
}
```
---

 `POST /reorder/:page`   
 
 Request Body: 
 
 ```JSON
{
  "{elements}": [
    {
      "id":"{elementId}",
      "order":"{order}",
      "...": "..."
    },
    {"...": "..."}
  ]
}
```

Response: 

`{success: true}`

---

 `POST /add/:page`   
 
 Request Body: 
 
 ```JSON
{
  "{element}":
    {
      "id":"{elementId}",
      "order":"{order}",
      "...": "..."
    }
}
```

Response: 

`{success: true}`

---

 `POST /edit/:element`   
 
 Request Body: 
 
 ```JSON
{
  "{element}":
    {
      "id":"{elementId}",
      "order":"{order}",
      "...": "..."
    }
}
```

Response: 

`{success: true}`



#####Pages: 
 
 `GET /pages`   
 
 Response: 
 
 `order by 'order'`
 
 ```JSON
{
  "{pages}": [
    {
      "id":"{page_id}",
      "property":"{page property}",
      "...": "..."
    },
    {"...": "..."}
  ]
}
```
---




 
