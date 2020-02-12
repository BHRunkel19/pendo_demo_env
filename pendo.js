// Pendo Scripts //
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