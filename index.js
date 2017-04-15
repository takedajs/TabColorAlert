var self = require('sdk/self');
var tabs = require("sdk/tabs");
var {Cc, Ci} = require("chrome");

var data = self.data;
var sss = Cc[ '@mozilla.org/content/style-sheet-service;1' ].getService( Ci.nsIStyleSheetService );
var ios = Cc[ '@mozilla.org/network/io-service;1' ].getService( Ci.nsIIOService );

var uri = ios.newURI(data.url('style.css'), null, null);

tabs.on('activate', function () {
    var tab_url = tabs.activeTab.url;
    console.log("tab_url" + tab_url);
    if (tab_url.match(/yahoo/i)) {
        console.log("追加");
        if( !sss.sheetRegistered( uri, sss.USER_SHEET ) ) {
            sss.loadAndRegisterSheet( uri, sss.USER_SHEET );
        }
    } else {
        console.log("削除");
        sss.unregisterSheet( uri, sss.USER_SHEET );
    }
});

tabs.on('ready', function () {
    var tab_url = tabs.activeTab.url;
        console.log("tab_url" + tab_url);
    if (tab_url.match(/yahoo/i)) {
        console.log("追加");
        if( !sss.sheetRegistered( uri, sss.USER_SHEET ) ) {
            sss.loadAndRegisterSheet( uri, sss.USER_SHEET );
        }
    } else {
        console.log("削除");
        sss.unregisterSheet( uri, sss.USER_SHEET );
    }
});

//tabs.on('activate', url_check);