# [server-table] (https://github.com/asarosi/serverTable)
Server Table is a table module for angular js. The main aspect of this component is to implement every method (pagination, sorting, filtering, etc.) on the server side, and display the modified data on the client side.

#Install
This component has the following dependencies:
 * [AngularJS] (https://github.com/angular/angular.js)
 * jQuery (bower install jquery)
 * [angular-translate] (https://github.com/angular-translate/angular-translate) to make it multilingual
 * [ngstorage] (https://github.com/gsklee/ngStorage) if you want filter caching 
 * [bootstrap] (https://github.com/twbs/bootstrap) for styling
 
```bash
#Bower
bower install server-table
```
 
#Usage
![image about the table] (http://i.imgur.com/4A71ibU.png)
Include into the HTML
```html
<script src="bower_components/server-table/dist/table.min.js"></script>
```
Include the model into Angular module
```js
angular.module('app', ['server-table'])
...
```
[**Example**] (https://github.com/asarosi/serverTable/tree/master/example)

#Components
**sTable** should be the wrapper element for every other table component
```html
<div s-table count-url="/count" list-url="/list" s-cache">
```
**sItemsByPage**
```html
<div s-items-by-page></div>
```
**sYearFilter**
```html
<div s-year-filter start="2000" end="2020"></div>
```
**sMonthFilter**
```html
<div s-month-filter></div>
```
**sSearch**
```html
<div s-search></div>
```
**sPagination**
```html
<td items-by-page="7" s-pagination></td>
```
**sSort** should be placed on each table header
```html
<td s-sort="_id"><b>{{'ID' | translate}}</b></td>
```
**sCache** should be place on the same element as sTable directive

#Configuration
**Provider**
```js
angular.module('app')
  .config(function(sTableProvider) {
    countUrl: 'item count url',
    listUrl: 'data url',
    sortAscIcon: 'css class name for asc sort icon',
    sortDescIcon: 'css class name for desc sort icon',
    sortNoneIcon: 'css class name for icon when there is no sort',
    paginatorTemplateUrl: 'html template path for paginator',
    itemsByPageTemplateUrl: 'html template path for item by page selector',
    yearFilterTemplateUrl: 'html template path for year filter',
    monthFilterTemplateUrl: 'html template path for month filter',
    searchFieldTemplateUrl: 'html template path for search field'
  }
```
**Component options**

|Component  | Attribute name | Description                          | Required
|-----------|----------------|--------------------------------------|----------
|sTable     | countUrl       | item count url for every single table|No
|sTable     | listUrl        | data url for every single table      |No
|sTable     | sCache         | define filtere caching               |No
|sPagination| itemsByPage    | number of items on every page (if sItemsByPage inactive)|Yes, if sItemsByPage isn't in use
|sYearFilter| startYear      | start year                           |Yes
|sYearFilter| endYear        | end year                             |Yes

**Hint**
sSort directive always has to have a unique value, which will identify the actual row!

