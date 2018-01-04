import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.block.events({
  'click button'(event, instance) {
    let remaining = 10;
    let timer = null;
    SUIBlock.block(remaining);
    timer = Meteor.setInterval(function () {
      SUIBlock.message.set(--remaining);
      if (remaining < 1) {
        Meteor.clearInterval(timer);
        SUIBlock.unblock();
      }
    }, 1000);
  }
});
