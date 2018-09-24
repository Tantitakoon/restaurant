'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.responseMessenger = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _service = require('../utils/class/service');

var _constants = require('../utils/constants');

var _functions = require('../utils/functions');

var request = require('request');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var responseMessenger = exports.responseMessenger = function (_Service) {
    _inherits(responseMessenger, _Service);

     function responseMessenger(app) {
            this.access_token = _constants.ENV.PAGE_ACCESS_TOKEN || env.PAGE_ACCESS_TOKEN;
            this.graph_url = 'https://graph.facebook.com/me';
            this.app = app ;


           //this.callSendAPI(path,payload,callback);
        
    }
    _createClass(responseMessenger, [{ 
        key: 'callSendAPI',
        value: function callSendAPI(path, request_body, callback) {
            if (!path) {
                console.error('No endpoint specified on Messenger send!');
                return;
            } else if (!this.access_token || !this.graph_url) {
                console.error('No Page access token or graph API url configured!');
                return;
            }
            request({
                uri: this.graph_url + path,
                qs: {'access_token': this.access_token},
                method: 'POST',
                json: request_body,
            }, (error, response, body) => {
           
                
                if (!error && response.statusCode === 200) {
                console.log('Message sent succesfully');
                } else {
                console.error('Error: ' + error);        
                }
                callback(body);
            });
        }
    
   }, {
        key: 'callGetPlace',
        value: function callGetPlace() {
            let data; 
            request('https://graph.facebook.com/search?type=place&fields=name,checkins,picture&q=cafe&center=13.7829759,100.5462527&distance=1000&access_token='+this.access_token, { json: true }, (err, res, body) => {
            if (err) { 
                return console.log(err); 
            }
           
                   data = JSON.stringify(body);
                   data = JSON.parse(data);
                   console.log("data : "+data);
                   
                 
           
            });
            return data;

            
        }
        
    }
    ]);


    return responseMessenger;

}(_service.Service);
