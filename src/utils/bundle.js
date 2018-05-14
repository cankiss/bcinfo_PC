var classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
};

var createClass = (function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
})();

var inherits = function(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
            "Super expression must either be null or a function, not " +
            typeof superClass
        );
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf ?
        Object.setPrototypeOf(subClass, superClass) :
        (subClass.__proto__ = superClass);
};

var possibleConstructorReturn = function(self, call) {
    if (!self) {
        throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
        );
    }

    return call && (typeof call === "object" || typeof call === "function") ?
        call :
        self;
};

var Storage = (function() {
    function Storage(type) {
        classCallCheck(this, Storage);

        type && (this.global = type);
    }

    createClass(Storage, [{
            key: "get",
            value: function get$$1(key) {
                try {
                    return JSON.parse(this.global.getItem(key) || null);
                } catch (e) {
                    return this.global.getItem(key);
                }
            }
        },
        {
            key: "set",
            value: function set$$1(key, data) {
                this.global.setItem(key, JSON.stringify(data));
            }
        },
        {
            key: "each",
            value: function each(fn) {
                for (var i = this.global.length - 1; i >= 0; i--) {
                    var key = this.global.key(i);
                    fn(this.get(key), key);
                }
            }
        },
        {
            key: "remove",
            value: function remove(key) {
                this.global.removeItem(key);
            }
        },
        {
            key: "clearAll",
            value: function clearAll() {
                this.global.clear();
            }
        }
    ]);
    return Storage;
})();

var local = new Storage(window.localStorage);
var session = new Storage(window.sessionStorage);

function visible(callback) {
    if (typeof callback !== "function") return;

    var hidden = "hidden";

    // Standards:
    if (hidden in document)
        document.addEventListener("visibilitychange", onchange);
    else if ((hidden = "mozHidden") in document)
        document.addEventListener("mozvisibilitychange", onchange);
    else if ((hidden = "webkitHidden") in document)
        document.addEventListener("webkitvisibilitychange", onchange);
    else if ((hidden = "msHidden") in document)
        document.addEventListener("msvisibilitychange", onchange);
    else if ("onfocusin" in document)
    // IE 9 and lower:
        document.onfocusin = document.onfocusout = onchange;
    else
    // All others:
        window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;

    function onchange(evt) {
        var v = "visible",
            h = "hidden",
            evtMap = {
                focus: v,
                focusin: v,
                pageshow: v,
                blur: h,
                focusout: h,
                pagehide: h
            };
        callback();
        evt = evt || window.event;
        if (evt.type in evtMap) document.body.className = evtMap[evt.type];
        else document.body.className = this[hidden] ? "hidden" : "visible";
    }
    if (document[hidden] !== undefined)
        onchange({ type: document[hidden] ? "blur" : "focus" });
}

var StayTime = (function() {
    function StayTime(params) {
        classCallCheck(this, StayTime);

        typeof params.callback === "function" && (this.callback = params.callback);
        this.timespan = StayTime.isNum(params.timespan);
        this.clearId = null;
        this.stay_sec = null;
        this.true_sec = null;
        this.start();
    }

    createClass(
        StayTime, [{
                key: "start",
                value: function start() {
                    this.clearId || this.interval();
                }
            },
            {
                key: "stop",
                value: function stop() {
                    if (this.clearId) {
                        clearInterval(this.clearId);
                        this.stay_sec += Number(
                            StayTime.convert(this.isEffective("stay_sec"), false)
                        );
                        local.set("stay_sec", {
                            total_sec: StayTime.convert(this.stay_sec, true),
                            timestamp: Math.round(new Date().getTime() / 1000)
                        });
                        this.true_sec = this.stay_sec; //really stay_sec
                        this.clearId = null;
                    }
                }
            },
            {
                key: "interval",
                value: function interval() {
                    var start = new Date().getTime(),
                        that = this;
                    that.clearId = setInterval(
                        (function _() {
                            var total = Math.round((new Date().getTime() - start) / 1000);
                            that.stay_sec = total;
                            that.true_sec = that.stay_sec;
                            that.true_sec > 0 &&
                                that.true_sec % that.timespan === 0 &&
                                that.callback();
                            // console.log(that.stay_sec);
                            return _;
                        })(),
                        1000
                    );
                }
            },
            {
                key: "isEffective",
                value: function isEffective(key) {
                    var obj = local.get(key);
                    if (obj && "timestamp" in obj) {
                        if (StayTime.checkDated(obj["timestamp"])) {
                            return obj["total_sec"];
                        } else {
                            local.remove(key);
                            return null;
                        }
                    } else {
                        return null; // convert can avoid null;
                    }
                }
            }
        ], [{
                key: "convert",
                value: function convert(str, status) {
                    // status true decode or false uncode
                    // must be number or null , avoid NaN
                    if (str == null) return null;
                    return status ?
                        window.btoa && window.btoa(str) :
                        window.atob && window.atob(str);
                }
            },
            {
                key: "isNum",
                value: function isNum(num) {
                    var param = Number(num);
                    return !isNaN(param) && param > 10 ? param : 10;
                }
            },
            {
                key: "checkDated",
                value: function checkDated(timestamp) {
                    var date = new Date(timestamp * 1000),
                        // timestamp must be * 1000
                        Y = date.getFullYear(),
                        M = date.getMonth() + 1,
                        D = date.getDate() + 1,
                        tomorrow = Y + "-" + (M < 10 ? "0" + M : M) + "-" + D + " 00:00:00";
                    return Date.parse(tomorrow) / 1000 > timestamp; // true is today,false is tomorrow
                }
            }
        ]
    );
    return StayTime;
})();

var CalcTime = (function(_StayTime) {
    inherits(CalcTime, _StayTime);

    function CalcTime(params) {
        classCallCheck(this, CalcTime);

        //package children Class for this.stop or start
        var _this = possibleConstructorReturn(
            this,
            (CalcTime.__proto__ || Object.getPrototypeOf(CalcTime)).call(this, params)
        );

        var that = _this;
        window.onload = function() {
            visible(function() {
                document.body.className === "hidden" && that.start();
                document.body.className === "visible" && that.stop();
            });
        };
        return _this;
    }

    return CalcTime;
})(StayTime);

export default CalcTime;