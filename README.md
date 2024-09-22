### RethinkDB Query List from Text or Manual Query Excel Exporter

- [Docker Installation](https://hub.docker.com/r/eaeoz/rethinkdb-query-app)

##### RethinkDB Query App let you update list from text (to select whenever you want to view query result) or let you enter manual query from gui, then you can import as xslx (excel format)

- Clone Repo

`git clone https://github.com/eaeoz/rethinkdb-query-app.git`

- Deploy Compose

`docker-compose up -d`

##### You can add more queries to queries.txt as same format. (don't forget to restart container if new list added)

#### Database Commands and Queries

- [Examples](https://rethinkdb.com/docs/cookbook/javascript/)

#### To Add Manual Records (Windows Gui)

- [ReQLPro](https://github.com/codehangar/reqlpro/releases)

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
