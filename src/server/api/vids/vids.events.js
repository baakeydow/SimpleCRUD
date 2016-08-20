/**
 * Thing model events
 */

'use strict';

import {EventEmitter} from 'events';
import Vids from './vids.model';
var VidsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
VidsEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Vids.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    VidsEvents.emit(event + ':' + doc._id, doc);
    VidsEvents.emit(event, doc);
  };
}

export default VidsEvents;
