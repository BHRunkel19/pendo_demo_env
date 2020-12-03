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
  

  (function(apiKey, dom){
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
                    addTrackEvent();
                    configEmbeddedSvc();
                },
                guidesLoaded: function() {
                    console.log("The guides have loaded!")
                    lookupGuides(pendo.guides);
                    addRCElementHandler();
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

        function addTrackEvent(){
            var trackEventBtn = document.querySelector('#trackEventBtn');
            trackEventBtn.addEventListener('click', function(e){
                console.log('Sending Track Event to Pendo: ' + e);
                alert('Track Event Sent!');
                pendo.track('Track Event Example', {
                    user: pendo.getSerializedMetadata().visitor.id,
                    role: pendo.getSerializedMetadata().visitor.role,
                    text: "This is some sample text"
                })  
            })
        }

        function configEmbeddedSvc(){
            var initESW = function(gslbBaseURL) {
                // embedded_svc.settings.targetElement = document.querySelector('#toast_sf_chat');
                embedded_svc.settings.displayHelpButton = false; //Or false
                embedded_svc.settings.language = ''; //For example, enter 'en' or 'en-US'
          
                //embedded_svc.settings.defaultMinimizedText = '...'; //(Defaults to Chat with an Expert)
                //embedded_svc.settings.disabledMinimizedText = '...'; //(Defaults to Agent Offline)
          
                //embedded_svc.settings.loadingText = ''; //(Defaults to Loading)
                //embedded_svc.settings.storageDomain = 'yourdomain.com'; //(Sets the domain for your deployment so that visitors can navigate subdomains during a chat session)
          
                // Settings for Chat
                //embedded_svc.settings.directToButtonRouting = function(prechatFormData) {
                  // Dynamically changes the button ID based on what the visitor enters in the pre-chat form.
                  // Returns a valid button ID.
                //};
                //embedded_svc.settings.prepopulatedPrechatFields = {}; //Sets the auto-population of pre-chat form fields
                //embedded_svc.settings.fallbackRouting = []; //An array of button IDs, user IDs, or userId_buttonId
                //embedded_svc.settings.offlineSupportMinimizedText = '...'; //(Defaults to Contact Us)
          
                embedded_svc.settings.enabledFeatures = ['LiveAgent'];
                embedded_svc.settings.entryFeature = 'LiveAgent';
          
                embedded_svc.init(
                  'https://toast--trdev.my.salesforce.com',
                  'https://trdev-toast.cs69.force.com/success',
                  gslbBaseURL,
                  '00D2D000000E5U5',
                  'Toast_Web_Chat_V2',
                  {
                    baseLiveAgentContentURL: 'https://c.la4-c1cs-phx.salesforceliveagent.com/content',
                    deploymentId: '5723c000000k9iJ',
                    buttonId: '573C00000008RMb',
                    baseLiveAgentURL: 'https://d.la4-c1cs-phx.salesforceliveagent.com/chat',
                    eswLiveAgentDevName: 'EmbeddedServiceLiveAgent_Parent04I3c0000000CK9EAM_174b30518e1',
                    isOfflineSupportEnabled: false
                  }
                );
            };
          
            if (!window.embedded_svc) {
            var s = document.createElement('script');
            s.setAttribute('src', 'https://toast--trdev.my.salesforce.com/embeddedservice/5.0/esw.min.js');
            s.onload = function() {
                initESW(null);
            };
            document.body.appendChild(s);
            } else {
            initESW('https://service.force.com');
            }
            console.log('Configuration of Embedded Service complete');
        }
            

        function addRCElementHandler(){
            var launchRCElement = document.querySelector('[data-id="1.0-Nav-Home.Dashboard"]');
            var rc = pendo.findGuideById('uY3KchoDHeBYQ5TsMmMd3f-p1gA');
            launchRCElement.addEventListener('click', function(e){
                rc.launch();
                // rc.modules[0].launch();
            })
        }

})('5ed91671-dfe6-4f7a-546f-5fd7b0804e58');