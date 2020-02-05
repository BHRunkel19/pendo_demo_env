// Pendo Scripts

var accounts = [
    "Stark Industries",
    "Wayne Enterprises",
    "Hooli",
    "Dunder Mifflin US",
    "Willy Wonka Industrial",
    "Pied Piper",
    "Dunder Mifflin EU",
    "Associated Strategies",
    "Krusty Krab",
    "Sterling Cooper"
    ];

    let month = new Date().getMonth()
    let weight;

    if (month % 2) {
    weight = [300, 175, 125, 100, 75, 75, 50, 50, 25, 25];
    } else {
    weight = [300, 25, 50, 50, 75, 75, 100, 125, 175, 25];
    }

    function getParameterByName(name, url) {
    if (!url) url = window.location.href;

    var cleanName = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + cleanName + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    let accountParam = getParameterByName('accountId');
    let visitorParam = getParameterByName('visitorId');

    function pickUsingWeights(items, weights) {
    var total = 0;
    var ranges = weights.slice(0);

    for (var i = 0, len = weights.length; i < len; i++) {
        ranges[i] = [total, total += ranges[i]];
    }
    var randomNumber = parseInt(Math.random() * total);
    for (; randomNumber < ranges[--i][0];);
    return items[i];
    }

    var account_id = pickUsingWeights(accounts, weight);

    let accString = account_id.replace(/\s/g, '');
    let randNum = Math.random() * 100;
    let visitor;
    let role;

    if (randNum < 25) {
    visitor = 'visitor1@' + accString + '.com';
    role = 'admin';
    } else if (randNum <= 50) {
    visitor = 'visitor6@' + accString + '.com';
    role = 'admin';
    } else if (randNum <= 65) {
    visitor = 'visitor4@' + accString + '.com';
    role = 'user';
    } else if (randNum <= 80) {
    visitor = 'visitor7@' + accString + '.com';
    role = 'user';
    } else if (randNum <= 90) {
    visitor = 'visitor5@' + accString + '.com';
    role = 'user';
    } else if (randNum <= 95) {
    visitor = 'visitor3@' + accString + '.com';
    role = 'read-only';
    } else {
    visitor = 'visitor2@' + accString + '.com';
    role = 'read-only';
    }
  

  (function(apiKey){
    (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=[];
    v=['initialize','identify','updateOptions','pageLoad'];for(w=0,x=v.length;w<x;++w)(function(m){
        o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
        y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
        z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');

        // Call this whenever information about your visitors becomes available
        // Please use Strings, Numbers, or Bools for value types.
        pendo.initialize({
                visitor: {
                    id:              visitorParam || visitor || 'VISITOR-UNIQUE-ID',
                    role:            role || 'user'  // Required if user is logged in
                    // email:        // Optional
                    // role:         // Optional

                    // You can add any additional visitor level key-values here,
                    // as long as it's not one of the above reserved names.
                },

                account: {
                    id:           accountParam || account_id // Highly recommended
                    // name:         // Optional
                    // planLevel:    // Optional
                    // planPrice:    // Optional
                    // creationDate: // Optional

                    // You can add any additional account level key-values here,
                    // as long as it's not one of the above reserved names.
                },
                events: {
                ready: function() {
                    console.log("Pendo is ready!")
                },
                guidesLoaded: function() {
                    console.log("The guides have loaded!")
                    lookupGuides(pendo.guides);
                    // callback //
                },
                guidesFailed: function() {
                    console.log("The guides have failed!")
                }
            }
        });

        // input callback here //
        function lookupGuides(guides){
        console.log(guides);
        // loop over list of guides, determine whats active
        }
})('5ed91671-dfe6-4f7a-546f-5fd7b0804e58');


//EU Pendo Install

// (function(apiKey){
//     (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=[];
//     v=['initialize','identify','updateOptions','pageLoad'];for(w=0,x=v.length;w<x;++w)(function(m){
//         o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
//         y=e.createElement(n);y.async=!0;y.src='https://cdn.eu.pendo.io/agent/static/'+apiKey+'/pendo.js';
//         z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
//         // Call this whenever information about your visitors becomes available
//         // Please use Strings, Numbers, or Bools for value types.
//         pendo.initialize({
//             visitor: {
//                 id:              'VISITOR-UNIQUE-ID'   // Required if user is logged in
//                 // email:        // Optional
//                 // role:         // Optional
//                 // You can add any additional visitor level key-values here,
//                 // as long as it's not one of the above reserved names.
//             },
//             account: {
//                 id:           'ACCOUNT-UNIQUE-ID' // Highly recommended
//                 // name:         // Optional
//                 // planLevel:    // Optional
//                 // planPrice:    // Optional
//                 // creationDate: // Optional
//                 // You can add any additional account level key-values here,
//                 // as long as it's not one of the above reserved names.
//             }
//         });
// })('27dfe707-9c25-45bb-7000-fd9e1f9a8ade');

//
// Segment Install
// <script>
//   !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
//   analytics.load("YwftWfBNKY9u0JVe3N1yG9yux5RdCggT");
//   analytics.page();
//   }}();
// </script>

// <script>
// analytics.identify('f4ca124298', {
//   name: 'Michael Bolton',
//   email: 'mbolton@initech.com'
// });
// </script>
  
//  <!-- Other Scripts-->
//  <!-- Start of Async Drift Code -->

// <script>
// "use strict";
// !function() {
//   var t = window.driftt = window.drift = window.driftt || [];
//   if (!t.init) {
//     if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));
//     t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ],
//     t.factory = function(e) {
//       return function() {
//         var n = Array.prototype.slice.call(arguments);
//         return n.unshift(e), t.push(n), t;
//       };
//     }, t.methods.forEach(function(e) {
//       t[e] = t.factory(e);
//     }), t.load = function(t) {
//       var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");
//       o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
//       var i = document.getElementsByTagName("script")[0];
//       i.parentNode.insertBefore(o, i);
//     };
//   }
// }();
// drift.SNIPPET_VERSION = '0.3.1';
// drift.load('268z87akt9cr');
// </script>




// <script>
// pendo.track("NAME", {
//   PROPERTY1: "Replace with Function Name",
//   PROPERTY2: "PROPERTY2VALUE",
//   PROPERTYN: "PROPERTYNVALUE"
// });
// </script>

// <!--Intercom Install-->
// <script>
//   window.intercomSettings = {
//     app_id: "pjmruj7i",
//     name: "John Doe", // Full name
//     email: "jesse@pendo.io", // Email address
//     created_at: "1312182000" // Signup date as a Unix timestamp
//   };
// </script>
// <script>(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/pjmruj7i';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();</script>
// 
// <!--Pendo Install for Intercom testing-->
// <script>
// (function(apiKey){
//     (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=[];
//     v=['initialize','identify','updateOptions','pageLoad'];for(w=0,x=v.length;w<x;++w)(function(m){
//         o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
//         y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
//         z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
//         pendo.initialize({
//             visitor: {
//                 id:  'Pendo-Intercom',
//                 name: "John Doe",
//                 email: 'jesse@pendo.io',
//             },
//             account: {
//                 id: "Intercom"     ,
//                 Company_name: "Intercom",
//                 accountfield:  '100',
//                 boolean_flag: false
//               }
//         });
//       })('fd2507d5-0da6-47c2-5189-f087c06e6922');
// </script>
