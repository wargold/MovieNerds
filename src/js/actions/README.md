# Actions

Actions are just things that happen *(seriously, that's it)*.
- most actions are user events (clicked a button, submitted a form, etc...)
- can also be other events such as an API call returning data

### Actions are (usually) made up of two parts


**type** - describes the action that occurred
```
FETCHING_MOVIEBYID
```


**payload** - *(optional)* any extra data that is needed


## Actions vs. Action Creators

Action creators are functions that create objects, actions are the objects that get created.

## What happens next?

All actions are automatically sent to **all** reducers. It is the reducers job to determine how to handle that action
(can also just ignore it).
