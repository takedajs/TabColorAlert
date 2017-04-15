var self = require('sdk/self');
const {Cc, Ci} = require("chrome");

var data = self.data;
var sss = Cc[ '@mozilla.org/content/style-sheet-service;1' ].getService( Ci.nsIStyleSheetService );
var ios = Cc[ '@mozilla.org/network/io-service;1' ].getService( Ci.nsIIOService );

// data.url('style.css'): resource://toolbar/data/style.css
var uri = ios.newURI(data.url('style.css'), null, null);

//if( !sss.sheetRegistered( uri, sss.USER_SHEET ) )
//{
//    sss.loadAndRegisterSheet( uri, sss.USER_SHEET );
//}

//const PageMod = require("sdk/page-mod").PageMod;
//
//PageMod({
//    include: ["*"],
//    contentScript: 'console.log("aaaaa");'
//});

//var str = "ABC";
//if (str.match(/e/i)) {
//    console.log("マッチ");
//}

var tabs = require("sdk/tabs");

tabs.on('activate', function () {
    var tab_url = tabs.activeTab.url;
    if (tab_url.match(/yahoo/i)) {
        sss.loadAndRegisterSheet( uri, sss.USER_SHEET );
    } else {
        sss.unregisterSheet( uri, sss.USER_SHEET );
    }
});

//var button = ToggleButton({
//    id: "stylist",
//    label: "stylist",
//    icon: "./icon-16.png",
//    onChange: function(state) {
//        if (state.checked) {
//            sss.loadAndRegisterSheet( uri, sss.USER_SHEET );
//        } else {
//            sss.unregisterSheet( uri, sss.USER_SHEET );
//        }
//    }
//});






//var tabs = require("sdk/tabs");
//var { attach, detach } = require('sdk/content/mod');
//var { Style } = require('sdk/stylesheet/style');
////var { ToggleButton } = require("sdk/ui/button/toggle");
////
//var style = Style({
//    uri: './style.css'
//});
//
//attach(style, tabs.activeTab);

//var button = ToggleButton({
//    id: "stylist",
//    label: "stylist",
//    icon: "./icon-16.png",
//    onChange: function(state) {
//        if (state.checked) {
//            attach(style, tabs.activeTab);
//        }
//        else {
//            detach(style, tabs.activeTab);
//        }
//    }
//});
