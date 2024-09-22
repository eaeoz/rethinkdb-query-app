### RethinkDB Query List from Text or Manual Query Excel Exporter

#### To Add Manual Records (Windows Gui)

- [Docker Installation](https://hub.docker.com/r/eaeoz/rethinkdb-query-app)

#### Windows App to manage database from gui:

- (ReQLPro)[https://github.com/codehangar/reqlpro/releases]

- (Examples)[https://rethinkdb.com/docs/cookbook/javascript/]

```
(id record unique can't be same)
add new records to the table using ReQLPro json example:

[
  {
    "id": "3" ,
    "name": "test3" ,
    "value": 102
  },
  {

    "id": "1" ,
    "name": "test1" ,
    "value": 99
  },
  {
    "id": "2" ,
    "name": "test2" ,
    "value": 101
  }
]


or single record:

{
  "id": "1" ,
  "name": "test1" ,
  "value": 99
}

```

#### To Run Application (on cli)

`npm install`

`node server.js`
