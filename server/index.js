var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/@yandeu/events/cjs/version.js
var require_version = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.VERSION = undefined;
  exports.VERSION = "0.0.6";
});

// node_modules/@yandeu/events/cjs/index.js
var require_cjs = __commonJS((exports) => {
  var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar;i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Events = undefined;
  var version_1 = require_version();
  var EE = function() {
    function EE2(fn, context, once) {
      if (once === undefined) {
        once = false;
      }
      this.fn = fn;
      this.context = context;
      this.once = once;
    }
    return EE2;
  }();
  var addListener = function(emitter, event, fn, context, once) {
    if (typeof fn !== "function") {
      throw new TypeError("The listener must be a function");
    }
    var listener = new EE(fn, context || emitter, once);
    if (!emitter._events.has(event))
      emitter._events.set(event, listener), emitter._eventsCount++;
    else if (!emitter._events.get(event).fn)
      emitter._events.get(event).push(listener);
    else
      emitter._events.set(event, [emitter._events.get(event), listener]);
    return emitter;
  };
  var clearEvent = function(emitter, event) {
    if (--emitter._eventsCount === 0)
      emitter._events = new Map;
    else
      emitter._events.delete(event);
  };
  var Events = function() {
    function Events2() {
      this._events = new Map;
      this._eventsCount = 0;
    }
    Object.defineProperty(Events2, "VERSION", {
      get: function() {
        return version_1.VERSION;
      },
      enumerable: false,
      configurable: true
    });
    Events2.prototype.eventNames = function() {
      return Array.from(this._events.keys());
    };
    Events2.prototype.listeners = function(event) {
      var handlers = this._events.get(event);
      if (!handlers)
        return [];
      if (handlers.fn)
        return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l);i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    Events2.prototype.listenerCount = function(event) {
      var listeners = this._events.get(event);
      if (!listeners)
        return 0;
      if (listeners.fn)
        return 1;
      return listeners.length;
    };
    Events2.prototype.emit = function(event) {
      var _a, _b;
      var args = [];
      for (var _i = 1;_i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      if (!this._events.has(event))
        return false;
      var listeners = this._events.get(event);
      var i;
      if (listeners.fn) {
        if (listeners.once)
          this.removeListener(event, listeners.fn, undefined, true);
        return (_a = listeners.fn).call.apply(_a, __spreadArray([listeners.context], args, false)), true;
      } else {
        var length_1 = listeners.length;
        for (i = 0;i < length_1; i++) {
          if (listeners[i].once)
            this.removeListener(event, listeners[i].fn, undefined, true);
          (_b = listeners[i].fn).call.apply(_b, __spreadArray([listeners[i].context], args, false));
        }
      }
      return true;
    };
    Events2.prototype.on = function(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    Events2.prototype.once = function(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    Events2.prototype.removeListener = function(event, fn, context, once) {
      if (!this._events.has(event))
        return this;
      if (!fn) {
        clearEvent(this, event);
        return this;
      }
      var listeners = this._events.get(event);
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, event);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length;i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length)
          this._events.set(event, events.length === 1 ? events[0] : events);
        else
          clearEvent(this, event);
      }
      return this;
    };
    Events2.prototype.removeAllListeners = function(event) {
      if (event) {
        if (this._events.delete(event))
          clearEvent(this, event);
      } else {
        this._events = new Map;
        this._eventsCount = 0;
      }
      return this;
    };
    Object.defineProperty(Events2.prototype, "off", {
      get: function() {
        return this.removeListener;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Events2.prototype, "addListener", {
      get: function() {
        return this.on;
      },
      enumerable: false,
      configurable: true
    });
    return Events2;
  }();
  exports.Events = Events;
});

// node_modules/node-datachannel/lib/index.js
import {createRequire} from "module";

// node_modules/node-datachannel/lib/datachannel-stream.js
import stream from "stream";

class DataChannelStream extends stream.Duplex {
  constructor(rawChannel, streamOptions) {
    super({
      allowHalfOpen: false,
      ...streamOptions,
      objectMode: true
    });
    this._rawChannel = rawChannel;
    this._readActive = true;
    rawChannel.onMessage((msg) => {
      if (!this._readActive)
        return;
      this._readActive = this.push(msg);
    });
    rawChannel.onClosed(() => {
      this.push(null);
      this.destroy();
    });
    rawChannel.onError((errMsg) => {
      this.destroy(new Error(`DataChannel error: ${errMsg}`));
    });
    if (!rawChannel.isOpen()) {
      this.cork();
      rawChannel.onOpen(() => this.uncork());
    }
  }
  _read() {
    this._readActive = true;
  }
  _write(chunk, encoding, callback) {
    let sentOk;
    try {
      if (Buffer.isBuffer(chunk)) {
        sentOk = this._rawChannel.sendMessageBinary(chunk);
      } else if (typeof chunk === "string") {
        sentOk = this._rawChannel.sendMessage(chunk);
      } else {
        const typeName = chunk.constructor.name || typeof chunk;
        throw new Error(`Cannot write ${typeName} to DataChannel stream`);
      }
    } catch (err) {
      return callback(err);
    }
    if (sentOk) {
      callback(null);
    } else {
      callback(new Error("Failed to write to DataChannel"));
    }
  }
  _final(callback) {
    if (!this.allowHalfOpen)
      this.destroy();
    callback(null);
  }
  _destroy(maybeErr, callback) {
    this._rawChannel.close();
    callback(maybeErr);
  }
  get label() {
    return this._rawChannel.getLabel();
  }
  get id() {
    return this._rawChannel.getId();
  }
  get protocol() {
    return this._rawChannel.getProtocol();
  }
}

// node_modules/node-datachannel/lib/index.js
var require2 = createRequire(import.meta.url);
var nodeDataChannel = require2("../build/Release/node_datachannel.node");
var lib_default = {
  ...nodeDataChannel,
  DataChannelStream
};

// node_modules/@geckos.io/server/lib/wrtc/nodeDataChannel.js
var createDataChannel = (pc, label, config) => {
  return new Promise((resolve, reject) => {
    try {
      const dc = pc.createDataChannel(label, config);
      resolve(dc);
    } catch (err) {
      console.error("ERROR:", err.message);
      reject(err);
    }
  });
};
var createPeerConnection = (peerName, config) => {
  return new Promise((resolve, reject) => {
    try {
      const peerConnection = new lib_default.PeerConnection(peerName, config);
      resolve(peerConnection);
    } catch (err) {
      reject(err);
    }
  });
};
var closePeerConnection = (peerConnection) => {
  return new Promise((resolve) => {
    if (peerConnection) {
      peerConnection.destroy();
      resolve();
    } else {
      resolve();
    }
  });
};
var closeDataChannel = (dataChannel) => {
  return new Promise((resolve) => {
    if (dataChannel === null || dataChannel === undefined ? undefined : dataChannel.isOpen()) {
      dataChannel.close();
      resolve();
    } else {
      resolve();
    }
  });
};
var cleanup = () => {
  return new Promise((resolve) => {
    try {
      lib_default.cleanup();
      resolve();
    } catch (err) {
      resolve();
    }
  });
};

// node_modules/@geckos.io/common/lib/types.js
var ArrayBufferView = Object.getPrototypeOf(Object.getPrototypeOf(new Uint8Array)).constructor;
// node_modules/@geckos.io/common/lib/constants.js
var EVENTS = {
  CONNECT: "connect",
  CONNECTION: "connection",
  DATA_CHANNEL_IS_OPEN: "dataChannelIsOpen",
  DISCONNECT: "disconnect",
  DISCONNECTED: "disconnected",
  DROP: "dropped",
  ERROR: "error",
  RAW_MESSAGE: "rawMessage",
  RECEIVED_FROM_DATA_CHANNEL: "receiveFromDataChannel",
  SEND_OVER_DATA_CHANNEL: "sendOverDataChannel"
};
var ERRORS = {
  BROWSER_NOT_SUPPORTED: "BROWSER_NOT_SUPPORTED",
  COULD_NOT_PARSE_MESSAGE: "COULD_NOT_PARSE_MESSAGE",
  DROPPED_FROM_BUFFERING: "DROPPED_FROM_BUFFERING",
  MAX_MESSAGE_SIZE_EXCEEDED: "MAX_MESSAGE_SIZE_EXCEEDED"
};

// node_modules/@geckos.io/common/lib/helpers.js
var promiseWithTimeout = (promise, ms, timeoutError = new Error("Promise timed out")) => {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(timeout);
    }, ms);
  });
  return Promise.race([promise, timeout]);
};
var pause = (ms = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
var tick = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;
var isStringMessage = (data) => {
  return typeof data === "string";
};
var isBufferMessage = (data) => {
  return data instanceof ArrayBuffer || data instanceof ArrayBufferView;
};
var isJSONMessage = (data) => {
  try {
    if (typeof data !== "string")
      return false;
    if (!isNaN(parseInt(data)))
      return false;
    JSON.parse(data);
    return true;
  } catch (error) {
    return false;
  }
};

// node_modules/@geckos.io/common/lib/parseMessage.js
var ParseMessage = (ev) => {
  let { data } = ev;
  if (!data)
    data = ev;
  const isBuffer = isBufferMessage(data);
  const isJson = isJSONMessage(data);
  const isString = isStringMessage(data);
  if (isJson) {
    const object = JSON.parse(data);
    const key = Object.keys(object)[0];
    const value = object[key];
    return { key, data: value };
  }
  if (isBuffer) {
    return { key: EVENTS.RAW_MESSAGE, data };
  }
  if (isString) {
    return { key: EVENTS.RAW_MESSAGE, data };
  }
  return { key: "error", data: new Error(ERRORS.COULD_NOT_PARSE_MESSAGE) };
};
// node_modules/@geckos.io/common/lib/sendMessage.js
var SendMessage = (dataChannel, maxMessageSize, eventName, data = null) => {
  var _a;
  const send = (data2, isBuffer) => {
    var _a2;
    const bytes = (_a2 = data2.byteLength) !== null && _a2 !== undefined ? _a2 : data2.length * 2;
    if (typeof maxMessageSize === "number" && bytes > maxMessageSize) {
      throw new Error(`maxMessageSize of ${maxMessageSize} exceeded`);
    } else {
      Promise.resolve().then(() => {
        if (dataChannel.send)
          dataChannel.send(data2);
        else {
          if (!isBuffer)
            dataChannel.sendMessage(data2);
          else
            dataChannel.sendMessageBinary(Buffer.from(data2));
        }
      }).catch((error) => {
        console.log("error", error);
      });
    }
  };
  if (!dataChannel)
    return;
  if (dataChannel.readyState === "open" || ((_a = dataChannel.isOpen) === null || _a === undefined ? undefined : _a.call(dataChannel))) {
    try {
      if (eventName === EVENTS.RAW_MESSAGE && data !== null && (isStringMessage(data) || isBufferMessage(data))) {
        send(data, isBufferMessage(data));
      } else {
        send(JSON.stringify({ [eventName]: data }), false);
      }
    } catch (error) {
      console.error("Error in sendMessage.ts: ", error.message);
      return error;
    }
  }
};
// node_modules/@geckos.io/common/lib/bridge.js
var events = __toESM(require_cjs(), 1);

class Bridge {
  constructor() {
    this.eventEmitter = new events.Events;
  }
  emit(eventName, data, connection = {}) {
    this.eventEmitter.emit(eventName, data, connection);
  }
  on(eventName, cb) {
    return this.eventEmitter.on(eventName, (data, options) => {
      cb(data, options);
    });
  }
  removeAllListeners() {
    this.eventEmitter.removeAllListeners();
  }
}
var bridge = new Bridge;
// node_modules/@geckos.io/common/lib/makeRandomId.js
var makeRandomId = (length = 24) => {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0;i < length; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return id;
};

// node_modules/@geckos.io/common/lib/runInterval.js
var runInterval = (interval = 200, runs = 1, cb) => {
  let counter = 0;
  if (typeof cb !== "function") {
    console.error("You have to define your callback function!");
    return;
  }
  const i = setInterval(() => {
    cb();
    counter++;
    if (counter === runs - 1) {
      clearInterval(i);
    }
  }, interval);
  cb();
};

// node_modules/@geckos.io/common/lib/reliableMessage.js
var makeReliable = (options, cb) => {
  const { interval = 150, runs = 10 } = options;
  const id = makeRandomId(24);
  runInterval(interval, runs, () => {
    cb(id);
  });
};
// node_modules/@geckos.io/server/lib/geckos/channel.js
var events2 = __toESM(require_cjs(), 1);
class ServerChannel {
  constructor(webrtcConnection, dataChannel, dataChannelOptions, userData) {
    this.webrtcConnection = webrtcConnection;
    this.dataChannel = dataChannel;
    this.dataChannelOptions = dataChannelOptions;
    this.userData = userData;
    this.eventEmitter = new events2.Events;
    this.receivedReliableMessages = [];
    this._id = webrtcConnection.id;
    this._roomId = undefined;
    const {
      autoManageBuffering = true
    } = dataChannelOptions;
    this.autoManageBuffering = autoManageBuffering;
    this.dataChannel.onOpen(() => {
      this.dataChannel.onMessage((msg) => {
        const { key, data } = ParseMessage(msg);
        this.eventEmitter.emit(key, data);
      });
      bridge.emit(EVENTS.CONNECTION, this);
    });
    this.dataChannel.onClosed(() => {
    });
  }
  get id() {
    return this._id;
  }
  get roomId() {
    return this._roomId;
  }
  onDisconnect(callback) {
    this.eventEmitter.on(EVENTS.DISCONNECT, (connectionState) => {
      const cb = (connectionState2) => callback(connectionState2);
      cb(connectionState);
    });
  }
  onDrop(callback) {
    this.eventEmitter.on(EVENTS.DROP, (drop) => {
      callback(drop);
    });
  }
  async close() {
    const connection = this.webrtcConnection.connections.get(this.id);
    if (connection)
      await connection.close();
    else
      console.log("connection not found!");
  }
  join(roomId) {
    this._roomId = roomId;
  }
  leave() {
    this._roomId = undefined;
  }
  get room() {
    return {
      emit: (eventName, data, options) => {
        this.webrtcConnection.connections.forEach((connection) => {
          const { channel } = connection;
          const { roomId } = channel;
          if (roomId === this._roomId) {
            if (options && options.reliable) {
              makeReliable(options, (id) => channel.emit(eventName, {
                MESSAGE: data,
                RELIABLE: 1,
                ID: id
              }));
            } else {
              channel.emit(eventName, data);
            }
          }
        });
      }
    };
  }
  get broadcast() {
    return {
      emit: (eventName, data, options) => {
        this.webrtcConnection.connections.forEach((connection) => {
          const { channel } = connection;
          const { roomId, id } = channel;
          if (roomId === this._roomId && id !== this._id) {
            if (options && options.reliable) {
              makeReliable(options, (id2) => channel.emit(eventName, {
                MESSAGE: data,
                RELIABLE: 1,
                ID: id2
              }));
            } else {
              channel.emit(eventName, data);
            }
          }
        });
      }
    };
  }
  forward(roomId) {
    return {
      emit: (eventName, data, options) => {
        this.webrtcConnection.connections.forEach((connection) => {
          const { channel } = connection;
          const { roomId: channelRoomId } = channel;
          if (roomId === channelRoomId) {
            if (options && options.reliable) {
              makeReliable(options, (id) => channel.eventEmitter.emit(eventName, {
                MESSAGE: data,
                RELIABLE: 1,
                ID: id
              }, this._id));
            } else {
              channel.eventEmitter.emit(eventName, data, this._id);
            }
          }
        });
      }
    };
  }
  emit(eventName, data = null, options) {
    if (options && options.reliable) {
      makeReliable(options, (id) => this._emit(eventName, {
        MESSAGE: data,
        RELIABLE: 1,
        ID: id
      }));
    } else {
      this._emit(eventName, data);
    }
  }
  _emit(eventName, data = null) {
    if (!this._roomId || this._roomId === this._roomId) {
      if (!this._id || this._id === this._id) {
        if (!this.dataChannel)
          return;
        const isReliable = data && typeof data === "object" && "RELIABLE" in data;
        const buffering = this.autoManageBuffering && +this.dataChannel.bufferedAmount() > 0;
        const drop = (reason, event, data2) => {
          this.eventEmitter.emit(EVENTS.DROP, { reason, event, data: data2 });
        };
        if (isReliable || !buffering) {
          const error = SendMessage(this.dataChannel, this.maxMessageSize, eventName, data);
          if (error)
            drop(ERRORS.MAX_MESSAGE_SIZE_EXCEEDED, eventName, data);
        } else {
          drop(ERRORS.DROPPED_FROM_BUFFERING, eventName, data);
        }
      }
    }
  }
  get raw() {
    return {
      emit: (rawMessage) => this.emit(EVENTS.RAW_MESSAGE, rawMessage),
      room: { emit: (rawMessage) => this.room.emit(EVENTS.RAW_MESSAGE, rawMessage) },
      broadcast: { emit: (rawMessage) => this.broadcast.emit(EVENTS.RAW_MESSAGE, rawMessage) }
    };
  }
  onRaw(callback) {
    this.eventEmitter.on(EVENTS.RAW_MESSAGE, (rawMessage) => {
      const cb = (rawMessage2) => callback(rawMessage2);
      cb(rawMessage);
    });
  }
  on(eventName, callback) {
    this.eventEmitter.on(eventName, (data, senderId = undefined) => {
      const cb = (data2, senderId2) => callback(data2, senderId2);
      const isReliableMessage = data && data.RELIABLE === 1 && data.ID !== "undefined";
      const expireTime = 15000;
      const deleteExpiredReliableMessages = () => {
        const currentTime = new Date().getTime();
        this.receivedReliableMessages.forEach((msg, index, object) => {
          if (msg.expire <= currentTime) {
            object.splice(index, 1);
          }
        });
      };
      if (isReliableMessage) {
        deleteExpiredReliableMessages();
        if (this.receivedReliableMessages.filter((obj) => obj.id === data.ID).length === 0) {
          this.receivedReliableMessages.push({
            id: data.ID,
            timestamp: new Date,
            expire: new Date().getTime() + expireTime
          });
          cb(data.MESSAGE, senderId);
        } else {
        }
      } else {
        cb(data, senderId);
      }
    });
  }
}

// node_modules/@geckos.io/server/lib/wrtc/webrtcConnection.js
import EventEmitter from "events";
var TIME_TO_HOST_CANDIDATES = 1e4;

class WebRTCConnection extends EventEmitter {
  constructor(id, configuration, connections, userData) {
    super();
    this.id = id;
    this.configuration = configuration;
    this.connections = connections;
    this.userData = userData;
    this.additionalCandidates = [];
    this.state = "open";
    this.options = {
      timeToHostCandidates: TIME_TO_HOST_CANDIDATES
    };
  }
  async init() {
    this.peerConnection = await promiseWithTimeout(createPeerConnection(this.id, this.configuration), 2000);
    return this.peerConnection;
  }
  async close(state = "closed") {
    await promiseWithTimeout(closeDataChannel(this.channel.dataChannel), 2000);
    await promiseWithTimeout(closePeerConnection(this.peerConnection), 2000);
    this.channel.dataChannel = null;
    this.peerConnection = null;
    this.channel.eventEmitter.on(EVENTS.DISCONNECT, () => {
      this.removeAllListeners();
      this.channel.eventEmitter.removeAllListeners();
    });
    this.channel.eventEmitter.emit(EVENTS.DISCONNECT, state);
    if (this.connections.has(this.id))
      this.connections.delete(this.id);
  }
}

// node_modules/@geckos.io/server/lib/wrtc/connectionsManager.js
class ConnectionsManagerServer {
  constructor(options) {
    this.options = options;
    this.connections = new Map;
  }
  createId() {
    let id = makeRandomId(24);
    while (this.connections.has(id))
      id = makeRandomId(24);
    return id;
  }
  getConnection(id) {
    return this.connections.get(id);
  }
  getConnections() {
    return this.connections;
  }
  async getUserData(authorization, request, response) {
    var _a;
    let userData = {};
    if ((_a = this.options) === null || _a === undefined ? undefined : _a.authorization) {
      if (typeof this.options.authorization !== "function") {
        console.log("[warning] Authorization is not a function!?");
        return { _statusCode: 500 };
      }
      const res = await this.options.authorization(authorization, request, response);
      if (typeof res === "boolean" && res)
        userData = {};
      else if (typeof res === "boolean" && !res)
        return { _statusCode: 401 };
      else if (typeof res === "number" && res >= 100 && res < 600)
        return { _statusCode: res };
      else
        userData = res;
    }
    return userData;
  }
  async createConnection(authorization, request, response) {
    const userData = await this.getUserData(authorization, request, response);
    if (userData._statusCode)
      return { userData, status: userData._statusCode };
    const newId = this.createId();
    const { ordered = false, label = "geckos.io", iceServers = [], portRange, iceTransportPolicy = "all", bindAddress = undefined, maxPacketLifeTime = undefined, maxRetransmits = 0, multiplex = true } = this.options;
    const dc_config = {
      maxPacketLifeTime,
      maxRetransmits,
      reliability: {
        unordered: !ordered
      }
    };
    let rtc_config = {
      iceTransportPolicy,
      iceServers: iceServers.map((ice) => ice.urls),
      bindAddress,
      enableIceUdpMux: multiplex
    };
    if ((portRange === null || portRange === undefined ? undefined : portRange.min) && (portRange === null || portRange === undefined ? undefined : portRange.max)) {
      portRange.min = Math.max(portRange.min, 1025);
      portRange.max = Math.min(portRange.max, 65535);
      rtc_config = { ...rtc_config, portRangeBegin: portRange.min, portRangeEnd: portRange.max };
    }
    const connection = new WebRTCConnection(newId, rtc_config, this.connections, userData);
    const pc = await connection.init();
    if (!pc)
      return { status: 500 };
    pc.onStateChange(async (state) => {
      if (state === "connected")
        connection.channel.maxMessageSize = +connection.channel.dataChannel.maxMessageSize();
      if (state === "disconnected" || state === "failed" || state === "closed") {
        await this.deleteConnection(connection, state);
      }
    });
    let gatheringState;
    let localDescription;
    const candidates = [];
    pc.onDataChannel((dc2) => {
      console.log("Peer1 Got DataChannel: ", dc2.getLabel());
    });
    pc.onGatheringStateChange((state) => {
      gatheringState = state;
    });
    pc.onLocalDescription((sdp, type) => {
      localDescription = { sdp, type };
    });
    pc.onLocalCandidate((candidate, mid) => {
      connection.additionalCandidates.push({ candidate, sdpMid: mid });
      candidates.push({ candidate, mid });
    });
    const dc = await promiseWithTimeout(createDataChannel(pc, label, dc_config), 2000);
    connection.channel = new ServerChannel(connection, dc, this.options, userData);
    let waitForLocalDescription = 0;
    while (typeof localDescription === "undefined" && waitForLocalDescription < 20) {
      waitForLocalDescription++;
      await pause(50);
    }
    const { id } = connection;
    if (!id)
      return { status: 500 };
    this.connections.set(id, connection);
    return {
      connection: {
        id,
        localDescription
      },
      userData,
      status: 200
    };
  }
  async deleteConnection(connection, state) {
    await connection.close(state);
  }
}

// node_modules/@geckos.io/server/lib/httpServer/helpers.js
var sendStatus = (res, status) => {
  const statuses = {
    200: "OK",
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error"
  };
  res.statusCode = status;
  res.setHeader("Content-Type", "text/plain");
  if (statuses[status])
    res.end(`${status}: ${statuses[status]}`);
  else
    res.end(status.toString());
};
var sendJSON = (res, json) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(json));
};
var getJSONBody = (req) => {
  return new Promise((resolve, reject) => {
    const body = [];
    req.on("error", () => {
      console.log("error");
      return reject();
    }).on("data", (chunk) => {
      body.push(chunk);
    }).on("end", () => {
      try {
        const bodyStr = Buffer.concat(body).toString();
        const json = JSON.parse(bodyStr);
        return resolve(json);
      } catch (err) {
        return reject();
      }
    });
  });
};

// node_modules/@geckos.io/server/lib/httpServer/routes.js
var connection = async (connectionsManager, req, res) => {
  try {
    const headers = req.headers;
    const { status, connection: connection2, userData } = await connectionsManager.createConnection(headers === null || headers === undefined ? undefined : headers.authorization, req, res);
    if (status !== 200) {
      if (status >= 100 && status < 600)
        return sendStatus(res, status);
      else
        return sendStatus(res, 500);
    }
    if (!connection2 || !connection2.id)
      return sendStatus(res, 500);
    const { id, localDescription } = connection2;
    if (!id || !localDescription)
      return sendStatus(res, 500);
    return sendJSON(res, {
      userData,
      id,
      localDescription
    });
  } catch (err) {
    return sendStatus(res, 500);
  }
};
var remoteDescription = async (connectionsManager, req, res) => {
  try {
    const pathname = req.url;
    const ids = pathname === null || pathname === undefined ? undefined : pathname.match(/[0-9a-zA-Z]{24}/g);
    const body = await getJSONBody(req);
    if (ids && ids.length === 1) {
      const id = ids[0];
      const connection2 = connectionsManager.getConnection(id);
      if (!connection2)
        return sendStatus(res, 404);
      const { sdp, type } = body;
      if (!sdp || !type)
        sendStatus(res, 400);
      connection2.peerConnection.setRemoteDescription(sdp, type);
      return sendStatus(res, 200);
    } else {
      return sendStatus(res, 400);
    }
  } catch (err) {
    return sendStatus(res, 500);
  }
};
var additionalCandidates = async (connectionsManager, req, res) => {
  try {
    const pathname = req.url;
    const ids = pathname === null || pathname === undefined ? undefined : pathname.match(/[0-9a-zA-Z]{24}/g);
    if (ids && ids.length === 1) {
      const id = ids[0];
      const connection2 = connectionsManager.getConnection(id);
      if (!connection2)
        return sendStatus(res, 404);
      const additionalCandidates2 = [...connection2.additionalCandidates];
      connection2.additionalCandidates = [];
      return sendJSON(res, additionalCandidates2);
    } else {
      return sendStatus(res, 400);
    }
  } catch (err) {
    return sendStatus(res, 500);
  }
};
var close = async (connectionsManager, req, res) => {
  try {
    const pathname = req.url;
    const ids = pathname === null || pathname === undefined ? undefined : pathname.match(/[0-9a-zA-Z]{24}/g);
    if (ids && ids.length === 1) {
      const id = ids[0];
      const connection2 = connectionsManager.getConnection(id);
      await (connection2 === null || connection2 === undefined ? undefined : connection2.close());
      return sendStatus(res, 200);
    } else {
      return sendStatus(res, 400);
    }
  } catch (err) {
    return sendStatus(res, 500);
  }
};

// node_modules/@geckos.io/server/lib/httpServer/setCors.js
var SetCORS = (req, res, cors) => {
  const { origin, allowAuthorization } = cors;
  if (typeof origin === "function") {
    res.setHeader("Access-Control-Allow-Origin", origin(req));
  } else {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Request-Headers", "X-Requested-With, accept, content-type");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  if (allowAuthorization) {
    res.setHeader("Access-Control-Allow-Headers", "authorization, content-type");
  } else {
    res.setHeader("Access-Control-Allow-Headers", "content-type");
  }
};
var setCors_default = SetCORS;

// node_modules/@geckos.io/server/lib/httpServer/httpServer.js
var PREFIX = "/.wrtc/v2";
var HttpServer = (server, connectionsManager, cors) => {
  const rootRegEx = new RegExp(PREFIX);
  const evs = server.listeners("request").slice(0);
  server.removeAllListeners("request");
  server.on("request", async (req, res) => {
    const pathname = req.url;
    const method = req.method;
    const forGeckos = typeof pathname === "string" && rootRegEx.test(pathname) === true;
    if (!forGeckos) {
      for (var i = 0;i < evs.length; i++) {
        evs[i].call(server, req, res);
      }
    }
    if (forGeckos) {
      const reg_co = new RegExp(`${PREFIX}/connections\$`).test(pathname);
      const reg_rd = new RegExp(`${PREFIX}/connections/[0-9a-zA-Z]+/remote-description\$`).test(pathname);
      const reg_ac = new RegExp(`${PREFIX}/connections/[0-9a-zA-Z]+/additional-candidates\$`).test(pathname);
      const reg_c = new RegExp(`${PREFIX}/connections/[0-9a-zA-Z]+/close\$`).test(pathname);
      const _connections = method === "POST" && reg_co;
      const _remote_description = method === "POST" && reg_rd;
      const _additional_candidates = method === "GET" && reg_ac;
      const _close = method === "POST" && reg_c;
      setCors_default(req, res, cors);
      if (method === "OPTIONS")
        return await sendStatus(res, 200);
      if (_connections)
        await connection(connectionsManager, req, res);
      else if (_remote_description)
        await remoteDescription(connectionsManager, req, res);
      else if (_additional_candidates)
        await additionalCandidates(connectionsManager, req, res);
      else if (_close)
        await close(connectionsManager, req, res);
      else
        await sendStatus(res, 404);
    }
  });
};
var httpServer_default = HttpServer;

// node_modules/@geckos.io/server/lib/geckos/server.js
import http from "http";
class GeckosServer {
  constructor(options) {
    var _a;
    this._cors = { origin: "*", allowAuthorization: false };
    this.connectionsManager = new ConnectionsManagerServer(options);
    if (typeof ((_a = options.cors) === null || _a === undefined ? undefined : _a.allowAuthorization) === "undefined" && typeof options.authorization === "function")
      this._cors.allowAuthorization = true;
    this._cors = { ...this._cors, ...options.cors };
  }
  get cors() {
    return this._cors;
  }
  get connections() {
    return this.connectionsManager.connections;
  }
  _onServerCloseEvent() {
    const promises = [];
    this.server.once("close", async () => {
      for (const [_, connection2] of Array.from(this.connectionsManager.connections)) {
        promises.push(connection2.close());
      }
      await Promise.all(promises);
      await promiseWithTimeout(cleanup(), 2000);
      bridge.removeAllListeners();
    });
  }
  listen(port = 9208) {
    this._port = port;
    this.server = http.createServer();
    this._onServerCloseEvent();
    httpServer_default(this.server, this.connectionsManager, this._cors);
    this.server.listen(port, () => {
      console.log(`Geckos.io signaling server is running on port ${port}`);
    });
  }
  addServer(server) {
    this.server = server;
    this._onServerCloseEvent();
    httpServer_default(this.server, this.connectionsManager, this._cors);
  }
  get port() {
    return this._port;
  }
  emit(eventName, data, options) {
    this.connections.forEach((connection2) => {
      const { channel: channel3 } = connection2;
      if (options && options.reliable) {
        makeReliable(options, (id) => channel3.emit(eventName, {
          MESSAGE: data,
          RELIABLE: 1,
          ID: id
        }));
      } else
        channel3.emit(eventName, data);
    });
  }
  room(roomId = undefined) {
    return {
      emit: (eventName, data) => {
        this.connections.forEach((connection2) => {
          const { channel: channel3 } = connection2;
          const { roomId: channelRoomId } = channel3;
          if (roomId === channelRoomId) {
            channel3.emit(eventName, data);
          }
        });
      }
    };
  }
  get raw() {
    return {
      emit: (rawMessage) => this.emit(EVENTS.RAW_MESSAGE, rawMessage),
      room: (roomId = undefined) => {
        return {
          emit: (rawMessage) => {
            this.room(roomId).emit(EVENTS.RAW_MESSAGE, rawMessage);
          }
        };
      }
    };
  }
  onConnection(callback) {
    bridge.on(EVENTS.CONNECTION, (channel3) => {
      const cb = (channel4) => callback(channel4);
      cb(channel3);
    });
  }
}
var geckosServer = (options = {}) => {
  const { iceTransportPolicy } = options;
  if (iceTransportPolicy === "relay") {
    console.error(`WARNING: iceTransportPolicy "relay" does not work yet on the server!`);
    options.iceTransportPolicy = "all";
  }
  return new GeckosServer(options);
};
var server_default = geckosServer;

// node_modules/@geckos.io/server/lib/index.js
var lib_default2 = server_default;

// index.ts
var io = lib_default2();
io.listen(3000);
io.onConnection((channel3) => {
  channel3.onDisconnect(() => {
    console.log(`${channel3.id} got disconnected`);
  });
  channel3.on("chat message", (data) => {
    console.log(`got ${data} from "chat message"`);
    io.room(channel3.roomId).emit("chat message", data);
  });
});
