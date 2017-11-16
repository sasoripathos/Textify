
                var startBtn2/*, stopBtn, hypothesisDiv*/, phraseDiv2/*, statusDiv*/;
                var key, languageOptions, formatOptions, recognitionMode, inputSource/*, filePicker*/;
                var SDK;
                var recognizer;
                var previousSubscriptionKey;
                let dom;

                document.addEventListener("DOMContentLoaded", function () {
                    //createBtn = document.getElementById("createBtn");
                    startBtn2 = document.getElementById("RecordAgent");
                    //stopBtn = document.getElementById("stopBtn");
                    phraseDiv2 = document.getElementById("phraseDivAgent");
                    //hypothesisDiv = document.getElementById("hypothesisDiv");
                    //statusDiv = document.getElementById("statusDiv");
                    key = "4d7a7bba7e6944028d26db96bf51b0db";
                    languageOptions = document.getElementById("languageOptions");
                    formatOptions = document.getElementById("formatOptions");
                    inputSource = document.getElementById("inputSource");
                    recognitionMode = "Interactive";
                    //filePicker = document.getElementById('filePicker');
                    startBtn2.addEventListener("click", function () {
                        if (key == "" || key == "YOUR_BING_SPEECH_API_KEY") {
                            alert("Please enter your Bing Speech subscription key!");
                            return;
                        }
                        if (!recognizer || previousSubscriptionKey != key) {
                                previousSubscriptionKey = key;
                                console.log('is it here ???');
                                SetupAgent();
                            }
                        console.log('recognizer', recognizer, previousSubscriptionKey)
                        //hypothesisDiv.innerHTML = "";
                        phraseDiv2.innerHTML = "";
                        RecognizerStartAgent(SDK, recognizer);
                        startBtn2.disabled = true;
                    });
                    
                    InitializeAgent(function (speechSdk) {
                        SDK = speechSdk;
                        dom = SDK;
                        startBtn2.disabled = false;
                    });


                });




        window.addEventListener("message",function(event){
            console.log(arguments);
            console.log(event.data.startRecordingAgent);
            if (event.data.startRecordingAgent) {
                console.log('document: ', document, document.getElementById("RecordAgent"));


                var startBtn2/*, stopBtn, hypothesisDiv*/, phraseDiv2/*, statusDiv*/;
                var key, languageOptions, formatOptions, recognitionMode, inputSource/*, filePicker*/;
                var SDK = dom;
                var recognizer;
                var previousSubscriptionKey;

                // On document load resolve the SDK dependency
                function InitializeAgent(OnCompleteAgent) {
                    require(["Speech.Browser.Sdk"], function(SDK) {
                        OnCompleteAgent(SDK);
                    });
                }
                
                // Setup the recognizer
                function RecognizerSetupAgent(SDK, recognitionMode, language, format, subscriptionKey) {
                    // recognitionMode = SDK.RecognitionMode.Interactive;

                    var recognizerConfig = new SDK.RecognizerConfig(
                        new SDK.SpeechConfig(
                            new SDK.Context(
                                new SDK.OS(navigator.userAgent, "Browser", null),
                                new SDK.Device("SpeechSample", "SpeechSample", "1.0.00000"))),
                        "Interactive",
                        language, // Supported languages are specific to each recognition mode. Refer to docs.
                        format); // SDK.SpeechResultFormat.Simple (Options - Simple/Detailed)
                    // Alternatively use SDK.CognitiveTokenAuthentication(fetchCallback, fetchOnExpiryCallback) for token auth
                    var authentication = new SDK.CognitiveSubscriptionKeyAuthentication(subscriptionKey);
                    return SDK.CreateRecognizer(recognizerConfig, authentication);
                
                    /*var files = document.getElementById('filePicker').files;
                    if (!files.length) {
                        return SDK.CreateRecognizer(recognizerConfig, authentication);
                    } else {
                        return SDK.CreateRecognizerWithFileAudioSource(recognizerConfig, authentication, files[0]);
                    }*/
                }
                // Start the recognition
                function RecognizerStartAgent(SDK, recognizer) {
                    console.log('starting Agent');
                    recognizer.Recognize((event) => {
                        /*
                         Alternative syntax for typescript devs.
                         if (event instanceof SDK.RecognitionTriggeredEvent)
                        */
                        switch (event.Name) {
                            // case "RecognitionTriggeredEvent" :
                            //     UpdateStatus("Initializing");
                            //     break;
                            // case "ListeningStartedEvent" :
                            //     UpdateStatus("Listening");
                            //     break;
                            // case "RecognitionStartedEvent" :
                            //     UpdateStatus("Listening_Recognizing");
                            //     break;
                            case "SpeechStartDetectedEvent" :
                                //UpdateStatus("Listening_DetectedSpeech_Recognizing");
                                console.log(JSON.stringify(event.Result)); // check console for other information in result
                                break;
                            case "SpeechHypothesisEvent" :
                                //UpdateRecognizedHypothesis(event.Result.Text, false);
                                console.log(JSON.stringify(event.Result)); // check console for other information in result
                                break;
                            case "SpeechFragmentEvent" :
                                //UpdateRecognizedHypothesis(event.Result.Text, true);
                                console.log(JSON.stringify(event.Result)); // check console for other information in result
                                break;
                            case "SpeechEndDetectedEvent" :
                                //OnSpeechEndDetected();
                                //UpdateStatus("Processing_Adding_Final_Touches");
                                console.log(JSON.stringify(event.Result)); // check console for other information in result
                                break;
                            case "SpeechSimplePhraseEvent" :
                                UpdateRecognizedPhraseAgent(JSON.stringify(event.Result.DisplayText, null, 3));
                                break;
                            case "SpeechDetailedPhraseEvent" :
                                UpdateRecognizedPhraseAgent(JSON.stringify(event.Result, null, 3));
                                break;
                            case "RecognitionEndedEvent" :
                                OnCompleteAgent();
                                //UpdateStatus("Idle");
                                console.log(JSON.stringify(event)); // Debug information
                                break;
                            default:
                                console.log(JSON.stringify(event)); // Debug information
                        }
                    })
                    .On(() => {
                        // The request succeeded. Nothing to do here.
                    },
                    (error) => {
                        console.error(error);
                    });
                }
                // Stop the Recognition.
                function RecognizerStopAgent(SDK, recognizer) {
                    // recognizer.AudioSource.Detach(audioNodeId) can be also used here. (audioNodeId is part of ListeningStartedEvent)
                    recognizer.AudioSource.TurnOff();
                }


                function SetupAgent() {
                    console.log('starting Agent Setup');
                    recognizer = RecognizerSetupAgent(SDK, "Interactive", "en-US", 0, "4d7a7bba7e6944028d26db96bf51b0db");
                    console.log(recognizer);
                    return recognizer;
                }
                function UpdateRecognizedPhraseAgent(json) {
                    //hypothesisDiv.innerHTML = "";
                    phraseDiv2.innerHTML += json + "\n";
                    console.log(phraseDiv2.innerHTML);

                    // console.log(window)
                }
                function OnCompleteAgent() {
                    startBtn2.disabled = false;
                    console.log('Phrase captured', phraseDiv2.innerHTML);
                    const iframe = document.getElementsByTagName('iframe')[0];
                    iframe.contentWindow
                    .postMessage({phraseAgent: phraseDiv2.innerHTML}, '*');
                }



                // document.addEventListener("DOMContentLoaded", function () {
                    //createBtn = document.getElementById("createBtn");
                    startBtn2 = document.getElementById("RecordAgent");
                    //stopBtn = document.getElementById("stopBtn");
                    phraseDiv2 = document.getElementById("phraseDivAgent");
                    //hypothesisDiv = document.getElementById("hypothesisDiv");
                    //statusDiv = document.getElementById("statusDiv");
                    key = "4d7a7bba7e6944028d26db96bf51b0db";
                    languageOptions = document.getElementById("languageOptions");
                    formatOptions = document.getElementById("formatOptions");
                    inputSource = document.getElementById("inputSource");
                    recognitionMode = "Interactive";
                    //filePicker = document.getElementById('filePicker');
                    startBtn2.addEventListener("click", function () {
                        if (key == "" || key == "YOUR_BING_SPEECH_API_KEY") {
                            alert("Please enter your Bing Speech subscription key!");
                            return;
                        }
                        if (!recognizer || previousSubscriptionKey != key) {
                                previousSubscriptionKey = key;
                                console.log('is it here ???');
                                SetupAgent();
                            }
                        console.log('recognizer', recognizer, previousSubscriptionKey)
                        //hypothesisDiv.innerHTML = "";
                        phraseDiv2.innerHTML = "";
                        RecognizerStartAgent(SDK, recognizer);
                        startBtn2.disabled = true;
                    });

                    InitializeAgent(function (speechSdk) {
                        SDK = speechSdk;
                        startBtn2.disabled = false;
                    });


                // });
                
                var startBtn2 = document.getElementById("RecordAgent");
                console.log('startbtn2 ', startBtn2.click())
                startBtn2.click(); 
            }
    

        });

