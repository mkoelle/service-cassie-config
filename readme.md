# Cassie - a cascading config store

## usage



## concepts


## Stories

### data input-output

1. user can store a value
1. user can return a value
1. user can store complex data
    1. assumed json object as input
1. user can retreive complex data
    1. assumed json as output
1. user can retreive complex data with specified depth
    1. assumed json as output, limited to 
1. user can retreive a sub-component
    1. single property in json structure as output
    1. complex sub-component as json in output
1. user can update complex sub-component
    1. assumed input is json
  
### auditing

1. user setting a value creates a historical record for the specific feild
1. user can retreive history of a single property in the store
1. user can retreive a history of a property in the store that also lists inherited values
1. user can retreive history of a parent object that includes history of child items

### validation

1. user can store a validation spec for a path
    1. assumed json schema
1. user can specify/store a validation url for a path
    1. asssumed url leads to a json schema
1. user can not set values that do not conform to specified validation on a path
    1. once a validation has been set, it is used for that path
  

### cascade

1. user can define a type on a path
1. user can specify default values for a (base) type
1. user can get default values from a path
    1. If there are values in the typed location the locations values are returened
    2. If there are no values in the typed location the (base) defaults are returned 
1. user can specify defaults for child elements in a tree.
1. user can get defaults from parent items
    1. If there are values in the typed location the locations values are returened
    1. If there are no values in the typed location and a parent object of the type exists, the parent defaults are returned
    1. If there are no values in the typed location, and no parents, the (base) defaults are returned 
1. user can override values at child level.
    1. this may or may not be accomplished through other stories 

## data storage and api

These representations of the data structure should be considered as simple 
thought excersises right now, and might not have any bearing on the end state

#### draft 1

sample draft config store -all in one

```
|-- parties
|   |-- _cassie
|   |   |-- type = [list]party
|   |   `-- balloon
|   |          `-- color = green
|   |-- jakes_birthday
|   |   `-- balloon
|   |       `-- color = red
|   `-- locats_shindig
|       `-- location = supersecret
|-- events
|   |-- _cassie
|   |   `-- type = [list]party
|   |-- opening_galla_1974
|   |   `-- balloon
|   |       `-- color = purple
|   `-- yarn_expo
|-- party
|   |-- _cassie
|   |   `-- validation = https://path.to.json.shema
|   |-- location = "the big oak tree"
|   `-- balloon
|       `-- _cassie
|           `-- type = balloon
`-- balloon
    `-- color = black
```

#### draft 2

draft config store - values

```
|-- parties
|   |-- jakes_birthday
|   |   `-- balloon
|   |       `-- color = red
|   `-- locats_shindig
|       `-- location = supersecret
|-- events
|   |-- opening_galla_1974
|   |   `-- balloon
|   |       `-- color = purple
|   `-- yarn_expo
```
draft config store - types w/defaults
```
|-- party
|   |-- location = "the big oak tree"
|   `-- balloon
|       `-- _cassie
|           `-- type = balloon
`-- balloon
    `-- color = black
```
draft confit store - types w/meta data
```
|-- party
|   `-- validation = https://path.to.json.shema
```

### Queries

* /parties/jakes_birthday/
    * { location: "the big oak tree", balloon: "red"}
* /parties/locats_shindig/
    * { location: "supersecret", balloon: "green"}
* /events/opening_galla_1974/
    * { location: "the big oak tree", balloon: "purple"}
* /events/yarn_expo/
    * { location: "the big oak tree", balloon: "black"}
