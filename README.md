


## Q1 
### Naming Targets
Each of the Targets in a Network has a MAC address which allows it to be uniquely identified. However this is
not particularly useful from a user perspective: a MAC address alone is difficult to remember and communicates no
information about where a Target is or how it is being used within a facility. We want to allow a Network overseer
to assign Targets human-readable names.
Design and implement an application which has the following functionality. You may use any language or framework
to develop this application.

- When a user loads the application in the browser, the application displays list of Targets associated to a
particular Wireless Power Network. This list should contain the Target’s MAC address (a string), along with
the name of the Target if one has been assigned.
- Any Target in the list may be assigned a name from the browser. Likewise, a Target which already has a name
may be renamed from the browser.
- Any name change is reflected immediately in the browser.

You may assume the Targets associated to a particular wireless Power Network are fixed and pre-specified – the
application does not need to handle adding or removing Targets. You also don’t need to worry about handling
multiple users in the application.

Each Target is stored in a database with the following format:

```
{
mac addr: [Target MAC address, a string]
}
```
The database is hosted in a container called 'db' with the following credentials (also environment variables in the container): 
```
- POSTGRES_DB=postgres
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=postgres
```  

You can solve this problem by using the available API on the 'web' container by going to the following url (when the container is running): 
> http://localhost:8000/api/targets/

Or you can create your own backend service/API that talks to the postgres database, or even you can hand roll a service that loads the data directly from the files:
- target_macs.json

Feel free to chose whichever alternative (if any) would work for you in the time alloted.

## Q2
### Searching for Targets
The web application should allow a Network overseer to filter Targets by name in order to find a specific Target or
group of Targets. Expand your application from Q1 to support the following functionality:
- A user of the application should be able to filter Targets by name from the browser. When a filter is applied,
the displayed list of Targets is updated to contain only Targets matching the filter.
- A user should be able to clear a filter from the browser. When a filter is cleared, the full list of Targets should
again be visible.
- Targets match a filter if the filter string is contained within the Target name. For example, a filter string “ab“
should match Targets named “ab” and “aabc”.
- Bonus: The list of displayed Targets should be reactive: it automatically updates as a user types a filter.

You can use the supplied API, the database container, or the file target macs with name.json for a list of named Targets to test with. Each Target is stored as a JSON object with the following format:
```
{
mac addr: [Target MAC address, a string],
name: [Target name, a string]
}
```

## Q3
### Tagging Targets
Finally, a network overseer may want to store additional metadata about Targets in order for more specific oversight,
especially for facilities containing a large number of Targets. Such metadata may include the Target’s location within the facility (e.g. “Northwest Corner”) or the type of device the Target is powering (e.g. “Sensor”, “Camera”).
Expand your application from Q2 to support **storing a set of tags associated to each Target**. 

If you are familiar with django, there are 4 files that you should look into to add the functionality of tags: 
- django-backend/api/models.py  To define the stored objects or tables in the database schema. See for example the model 'Target' within the models.py file.  
- django-backend/api/serializers.py To specify the content that the API endpoint would display when retrieving  information from the database. See for example 'TargetSerializer'.
- django-backend/api/views.py To create the API endpoint that would display the retrieved information. See for example the TargetViewSet class. 
- django-backend/api/urls.py Finally in this file you can add the new API endpoint to the router. See for example how the Target endpoint is added `router.register(r'targets', views.TargetViewSet)`. 

To run migrations on the web container, execute on the terminal the following commands: 
```
$ docker-compose run web python manage.py makemigrations
$ docker-compose run web python manage.py migrate
```

If you hand rolled your own backend to manage the target data, you can use the supplied file target_macs_with_tags.json for a list of named Targets to test with. Each Target in this file is stored as an object with the following format:
```
{
mac addr: [Target MAC address a string],
name: [Target name, a string],
tags: [Target tags, a list of strings]
}
``` 

The application should also support the following functionality:
- The application should display the tags associated with each Target in the browser. Note that you do not have
to support adding or removing tags from the browser.
- A user of the application should be able to filter Targets by tag from the browser. Note that this should be
distinct from the name filtering above: a user can supply a name filter criteria in addition to a tag filter criteria.
- A Target matches the tag filter criteria if tags in the filter are a subset of the tags associated to the Target.
For example, filtering for Targets with tags “a” and “b” should match a Target with tags “a” and “b”, as well
as a Target with tags “a”, “c”, and “b”.
- When a name or tag filter is applied, the displayed list of Targets is updated to contain only the Targets
matching both the name and tag filter.
- Bonus: The list of displayed Targets should be reactive: it automatically updates as a user types a filter.


