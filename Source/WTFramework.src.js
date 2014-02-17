/**
 * WTFramework local version
 *
 * Local version of WTFramework, no external calls, no cdn just framework an version check.
 *
 * @see http://oskarkrawczyk.github.com/wtframework/
 */
(function() {

    var fwUl, fwLi = [], fwRemove, wtFramework = document.getElementById('_wtframework');

    fwRemove = function() {
        document.body.removeChild(fwUl);
    };

    if (wtFramework) {
        document.body.removeChild(wtFramework);
        return;
    }

    function fwApplyStyles(element, styles) {
        for (var s in styles) {
            if (typeof element.style.setProperty !== 'undefined') {
                element.style.setProperty(s, styles[s], null);
            } else {
                element.style[s] = styles[s];
            }
        }
    }

    /**
     * List of all known frameworks
     *
     * Key is framework name, value is array of version strings
     *
     * @type {Object}
     */
    var fwList = {
        'Ace': ['ace'],
        'ActiveJS': ['ActiveSupport'],
        'AngularJS': ['angular.version.full'],
        'Backbone.js': ['Backbone.VERSION'],
        'Backbone localStorage': ['Store'],
        'Base2': ['base2.version'],
        'Batman.js': ['Batman'],
        'CamanJS': ['Caman.version.release'],
        'Chainvas': ['Chainvas'],
        'CoffeeScript': ['CoffeeScript'],
        'Clientcide Libraries': ['Clientcide.version'],
        'Crafty': ['Crafty.init'],
        'CSS 3 Finalize': ['$.cssFinalize'],
        'CSS 3 Pie': ['PIE'],
        'Cufón': ['Cufon'],
        'D3': ['d3.version'],
        'Datejs': ['Date.today'],
        'Davis.js': ['Davis.version'],
        'DD_belatedPNG': ['DD_belatedPNG'],
        'DocumentUp': ['DocumentUp'],
        'DHTMLX': ['dhtmlx'],
        'Dojo': ['dojo.version'],
        'Dojo Mobile': ['dojox.mobile'],
        'Ember': ['Ember.VERSION'],
        'Enyo': ['enyo'],
        'Ext JS': ['Ext.version','Ext.versions.core.version'],
        'fancyBox': ['$.fancybox.version'],
        'flexie': ['Flexie.version'],
        'Flot': ['$.plot.version'],
        'Galleria': ['Galleria.version'],
        'Google Chrome Frame': ['CFInstall'],
        'g.Raphaël': ['Raphael.fn.g'],
        'Glow': ['glow.VERSION'],
        'Handlebars': ['Handlebars.VERSION'],
        'Head JS': ['head.js'],
        'Highcharts JS': ['Highcharts.version'],
        'History.js': ['History.Adapter'],
        'Hogan.js': ['Hogan'],
        'html5shiv': ['html5'],
        'ICanHaz.js': ['ich.VERSION'],
        'JS State Machine': ['StateMachine.VERSION'],
        'JavaScriptMVC': ['steal.fn'],
        'jQuery': ['jQuery.fn.jquery'],
        'jQuery Mobile': ['jQuery.mobile'],
        'jQuery throttle / debounce': ['jQuery.debounce'],
        'jQuery Tools': ['jQuery.tools.version'],
        'jQuery Cycle': ['jQuery.fn.cycle.ver'],
        'jQuery UI': ['$.ui.version'],
        'js-signals': ['signals.VERSION'],
        'JSXGraph': ['JXG'],
        'Kendo UI': ['kendo'],
        'Knockout': ['ko'],
        'LABjs': ['$LAB'],
        'LESS': ['less'],
        'LightningJS': ['lightningjs'],
        'LungoJS': ['LUNGO.VERSION'],
        'Masonry': ['jQuery.fn.masonry'],
        'Midori': ['midori.domReady'],
        'Modernizr': ['Modernizr._version'],
        'MochiKit': ['MochiKit.MochiKit.VERSION'],
        'MooTools A.R.T.': ['ART.version'],
        'MooTools Core': ['MooTools.version'],
        'MooTools More': ['MooTools.More.version'],
        'Mustache': ['Mustache.version'],
        'Ninja UI': ['jQuery.ninja.version'],
        'Noisy': ['jQuery.fn.noisy'],
        'oCanvas': ['oCanvas'],
        'o2.js': ['o2.version'],
        'PageDown': ['Markdown'],
        'Prettify': ['prettyPrint'],
        'Processing.js': ['Processing.version'],
        'Prototype': ['Prototype.Version'],
        'PubNub': ['PUBNUB'],
        'Qooxdoo': ['qx.$$libraries.qx.version'],
        'Raphaël': ['Raphael.version'],
        'React': ['React.version'],
        'Rico': ['Rico.Version'],
        'RightJS': ['RightJS.version'],
        'Sammy': ['Sammy.VERSION'],
        '$script.js': ['$script'],
        'Script.aculo.us': ['Scriptaculous.Version'],
        'Scripty2': ['S2.Version'],
        'Sencha Touch': ['Ext.util.TapRepeater'],
        'Sizzle': ['Sizzle'],
        'Snack': ['snack.v'],
        'Socket.io': ['io.version'],
        'Spine': ['Spine.version'],
        'SproutCore': ['SC.isReady'],
        'Spry': ['Spry.$'],
        'Sugar': ['Object.SugarMethods'],
        'SWFObject': ['swfobject'],
        'Terrific': ['Tc'],
        'Tiny Scrollbar': ['jQuery.fn.tinyscrollbar'],
        'Twitter Lib': ['twitterlib'],
        'Underscore.js': ['_.VERSION'],
        'Waypoints': ['jQuery.waypoints'],
        'Wink toolkit': ['wink'],
        'WebFont Loader': ['WebFont'],
        'xui': ['x$'],
        'yepnope.js': ['yepnope'],
        'YUI': ['YAHOO.VERSION', 'YUI.version'],
        'Zepto': ['Zepto'],
        'ZK': ['zk.version']
    };

    var fwStyleLi = {
        'cursor' : 'pointer',
        'text-align' : 'left',
        'padding' : '12px 16px',
        'margin' : '0 0 8px',
        'list-style' : 'none',
        'font' : 'bold 12px Helvetica, Arial, sans-serif',
        //'background' : '-moz-linear-gradient(top, rgba(255, 255, 255, 0.9) 0%, rgba(243, 243, 243, 0.9) 100%)', // FF3.6+
        //'background' : '-webkit-linear-gradient(top, rgba(255, 255, 255, 0.8) 0%, rgba(243, 243, 243, 0.8) 100%)', // Chrome10+, Safari5.1+
        //'background' : '-o-linear-gradient(top, rgba(255, 255, 255, 0.9) 0%, rgba(243, 243, 243, 0.9) 100%)', // Opera 11.10+
        //'background' : 'linear-gradient(top, rgba(255, 255, 255, 0.9) 0%, rgba(243, 243, 243, 0.9) 100%)', // W3C
        'background' : 'rgba(243, 243, 243, 0.9)',
        'color' : '#666',
        'border-radius' : '4px',
        'border' : 'solid 1px rgba(255, 255, 255, 0.9)',
        'text-shadow' : '0 1px 0 #fff',
        'box-shadow' : '0 0 8px rgba(0, 0, 0, 0.6)',
        'float' : 'right',
        'clear' : 'both',
        'min-width' : '170px'
    };

    var fwStyleUl = {
        'position' : 'fixed',
        'padding' : '0',
        'margin' : '0',
        'right' : '10px',
        'top' : '10px',
        'z-index' : 16777271
    };

    var props = {
        id : '_wtframework',
        onclick : fwRemove
    };

    fwUl = document.createElement('ul');

    for (var prop in props) {
        fwUl[prop] = props[prop];
    }

    fwApplyStyles(fwUl, fwStyleUl);

    document.body.appendChild(fwUl);

    var showInfo = function(fwName, fwVersion) {
        var pkgs = window.wtfPkgs,
            s;

        fwLi = document.createElement('li');
        fwLi.appendChild(document.createTextNode(fwName));

        if (fwVersion && (fwVersion != '%build%')) {
            fwLi.appendChild(document.createTextNode(' (' + fwVersion + ')'));
        }

        fwApplyStyles(fwLi, fwStyleLi);
        fwUl.appendChild(fwLi);
    };

    var findFrameworks = function() {
        var howMany = 0;

        for (var fwNs in fwList) {
            if (fwList.hasOwnProperty(fwNs)) {
                // Loop through all possible version paths
                for (var j = 0; j < fwList[fwNs].length; j++) {
                    var exists = window,
                        verPath = fwList[fwNs][j];

                    for (var i = 0, idents = verPath.split('.'); i < idents.length; i++) {
                        exists = exists && exists[idents[i]];
                    }
                    if (exists) {
                        var version = false;
                        if (typeof exists === 'string' && !exists.match(/^<%=/)) {
                            version = exists;
                        } else if (typeof exists === 'object' && exists.hasOwnProperty('toString')) {
                            version = exists.toString();
                        }
                        if (version !== false) {
                            // remove build number ex. "(12345)"
                            version = version.replace(/\s*\(.+\)\s*/, '');
                        }

                        showInfo(fwNs, version);
                        howMany++;
                        break;
                    }
                }
            }
        }

        if (!howMany) {
            showInfo('No known framework detected.');
        }
    };

    findFrameworks();

}());
