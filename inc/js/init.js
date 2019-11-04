import 'jquery';
import '../lib/primeui-all.js'

import '../icomoon/style.css';
import 'font-awesome/css/font-awesome.css';
import 'jqueryui/jquery-ui.css';
import 'primeui/themes/omega/theme.css';
import 'primeui/primeui.css'
import 'jsplumb/dist/js/jsplumb.js';

import '../css/style.css';
import '../css/core.css';
import '../css/dialog.css';
import '../css/button.css';
import '../css/dropdown.css';
import '../css/inputtext.css';
import '../css/checkbox.css';
import '../css/datatable.css';
import '../css/flow.css';


var $base = require('./base.js');
window.$base = new $base();
var $flow = require('./flow.js');
window.$flow = new $flow();