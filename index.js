var self = require('sdk/self');
var tabs = require("sdk/tabs");
var {Cc, Ci} = require("chrome");
var data = self.data;

var sss = Cc[ '@mozilla.org/content/style-sheet-service;1' ].getService( Ci.nsIStyleSheetService );
var ios = Cc[ '@mozilla.org/network/io-service;1' ].getService( Ci.nsIIOService );

var uri = ios.newURI(data.url('style.css'), null, null);

//タブを赤色にしたいページのURLの一部を記述する
var matchKeywords = [
    "www.yahoo",
    "www.hatena",
    "www.wikipedia"
];

tabs.on('activate', function () {
    url_check(tabs);
});

tabs.on('ready', function () {
    url_check(tabs);
});

function url_check(tabs) {
    var tabUrl = tabs.activeTab.url;

    console.log("tab_url" + tabUrl);

    var isMatch = false;
    for (var i = 0; i < matchKeywords.length; i++) {
        var regexp = new RegExp(matchKeywords[i], 'i');
        isMatch = tabUrl.match(regexp);
        if (isMatch) {
            break;
        }
    }

    if (isMatch) {
        console.log("CSS追加");
        if( !sss.sheetRegistered( uri, sss.USER_SHEET ) ) {
            sss.loadAndRegisterSheet( uri, sss.USER_SHEET );
        }
    } else {
        console.log("CSS削除");
        sss.unregisterSheet( uri, sss.USER_SHEET );
    }
}