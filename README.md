UI blocker and loader for Meteor using Semantic UI
=============

![overview](https://raw.githubusercontent.com/tripflex/meteor-suiblocker/master/demo.gif)

Based on [Meteor UIBlocker](https://github.com/VeliovGroup/Meteor-UIBlocker/)

Using the [Semantic UI](https://github.com/Semantic-Org/Semantic-UI/tree/master/dist/components) dimmer, and loader CSS
https://github.com/Semantic-Org/Semantic-UI/tree/master/dist/components

### Demo
Live Demo: https://demo-kfvacvnspk.now.sh

Or you can build it yourself using [Meteor Kitchen](http://www.meteorkitchen.com)

### Installation
```shell
meteor add tripflex:suiblocker
```

### Usage
##### Block screen:
```javascript
SUIBlock.block();
SUIBlock.block('some message'); // <-- Block with message
```

##### Unblock screen:
```javascript
SUIBlock.unblock();
```

##### Check if screen is blocked:
```javascript
if (SUIBlock.isBlocked) {
  // Do something
}
```

##### `Meteor.status` example:
```javascript
Tracker.autorun(function () {
  if (Meteor.status().connected) {
    SUIBlock.unblock();
  } else {
    SUIBlock.block(Meteor.status().status);
  }
});
```

##### Change message on the fly:
```javascript
SUIBlock.block('Sending email...');
Meteor.setTimeout(function () {
  SUIBlock.message.set('Please wait...');
}, 1000);
```

##### `Meteor.call` example:
```javascript
SUIBlock.block('Sending email...');
Meteor.call('sendEmail', subject, body, function (err, res) {
  SUIBlock.unblock();
});
```

##### Recommended DOM structure
Recommended to have main block element right after `body` tag, which wraps all website content. ID and Class name doesn't make any sense, in example we will use [tw]bootstrap's `.container` as a wrapper for content.
```html
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    <div class="container">
      <!-- All content here -->
    </div>
  </body>
</html>
```

### Bugs or Feature Requests
https://github.com/tripflex/meteor-suiblocker
