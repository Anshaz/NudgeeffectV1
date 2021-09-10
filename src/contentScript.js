import 'babel-polyfill'
import BetterFoodChoice from "./BetterChoices/App";
import Survey from "./Survey";
import Cart from './Cart';
import Tracker from './Tracker';
import $ from 'jquery';
import Storage from './utils/storage';

import * as firebase from "firebase/app";
import 'firebase/functions';
import 'firebase/analytics'

firebase.initializeApp({
  apiKey: "AIzaSyCSUbfmHzPrzQ6l2nkTeJvzcmW0Hv7yrFQ",
  authDomain: "nudgeeffectv1.firebaseapp.com",
  databaseURL: "https://nudgeeffectv1-default-rtdb.firebaseio.com/",
  projectId: "nudgeeffectv1",
  storageBucket: "nudgeeffectv1.appspot.com",
  messagingSenderId: "238314239567",
  appId: "1:238314239567:web:fb45a675cf45db019e1c3a",
  measurementId: "G-5314N2HF33"
});


(async () => {



  /**
   *  initialize app
   * function is called every time the page loads
   * default tracker if not itialized with survey
   *
   * @param {string} [tracker=new Tracker(await Storage.get("bfc:userID"))]
   */
  const initApp = async (tracker) => {

    $("#bfcLoader").remove()

    // check region

    // track page
    if (!tracker) tracker = new Tracker(await Storage.get("bfc:userID"));

    // init main plugin class
    const App = new BetterFoodChoice(tracker);
    App.init(


    );


    // if study completed disable cart
    if (await Storage.get("bfc:studyStatus") == 2)
      return

    // init cart class
    window.BetterFoodChoiceCart = new Cart();
    window.BetterFoodChoiceCart.render()

    // track events
    window.BetterFoodChoiceCart.onAddToCart = async (product) => {
      tracker.trackEvent("track_cart", {
        add_remove: 'add',
        product
      })
    }

    window.BetterFoodChoiceCart.onRemoveFromCart = (product) => {
      tracker.trackEvent("track_cart", {
        add_remove: 'remove',
        product
      })
    }

    // on finished study
    window.BetterFoodChoiceCart.onFinishStudy = async (basket) => {

      // set finish study
      Storage.set("bfc:studyStatus", 2)

      tracker.trackEvent("finish_study", basket);

      BetterFoodChoice.showAlert('Vielen Dank!', 'Die haben den Shopping Teil der Studie abgeschlossen, Wenn Sie an einem Geschenk im Wert von 50 EUR teilnehmen möchten, hinterlassen Sie bitte Ihre E-Mail-Adresse.', async () => {
        // redirect to survey
        // group
        const group = await Storage.get('bfc:studyGroup');
        const country = await Storage.get('bfc:country');
        const userID = await Storage.get('bfc:userID')
        let q = '';
        switch (group) {
          case 'A':
            q = country == 'de' ? 'PQDET2' : 'PQCHT2';
            break;
          case 'C':
            q = country == 'de' ? 'PQDEC' : 'PQCHC';
            break;
        }
        const date = new Date();
        const date2 = new Date(await Storage.get('qualityStartTime'));
        // if ((date - date2) < 120000) {
        //   window.location.href = 'https://s.cint.com/Survey/Finished?ProjectToken=69df2548-c950-8f09-45cb-ef16c9c33f04'
        // } else {
        //   //window.location.href = `	https://www.soscisurvey.de/scorethical/?r=${userID}&q=${q}`
          window.location.href = `	https://docs.google.com/forms/d/e/1FAIpQLScdnm9Sl6DK2N45o5FJRqWa-pnJRSW-3-zWOWRDMok3GWw8Wg/viewform?usp=pp_url&entry.197943519=${userID}`
        // }
        $("#bfcCart").remove();
      }, 'Fragebogen')

    }



  }

  const initSurvey = async () => {
    const survey = new Survey(await Storage.get("bfc:country"))
    survey.render(async (data) => {


      // show loader
      $("body").append($("<div id='bfcLoader'>").html("<p>Loading....</p>"))

      // language change
      Storage.set("bfc:country", data.country)

      // init tracker
      const tracker = new Tracker(await Storage.get("bfc:userID"))


      // send infos to backend
      let response = await tracker.trackEvent('survey', {
        ...data,
        studyGroup: await Storage.get('bfc:studyGroup')
      })
      Storage.set("test", response)

      // callback when done survey  
      initApp(tracker)

      // set did intro survey
      Storage.set("bfc:introSurvey", 'true')

    });
  }


  // run app if already did survey
  if (await Storage.get('bfc:introSurvey') == 'true') {
    initApp()
    BetterFoodChoice.showRestartButton()

  }

  // if not completed survey
  if (! await Storage.get('bfc:introSurvey') && await Storage.get("bfc:studyStatus") == '1') {
    initSurvey()
    BetterFoodChoice.showRestartButton()

  }

  // restart
  if (await Storage.get("bfc:studyStatus") == '2') {
    BetterFoodChoice.showRestartButton()
  }


  // init survey 
  chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {

    if (request.payload.action == "bfc:startSurvey") {

      // set user id
      Storage.set('bfc:userID', request.payload.userID)

      // set study status 
      Storage.set('bfc:studyStatus', 1)

      // set study status 
      Storage.set('bfc:country', request.payload.lang)

      initSurvey();

    }

    // update status in popup
    if (request.payload.action === 'bfc:getStudyStatus') {
      sendResponse(await Storage.get("bfc:studyStatus") || 0)
    }
  });


  // add Roboto font
  $("head").append('<link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">')

})()






//runtimeconfig.json
// {
//   "firebase": {
//     "projectId": "nudgeeffectv1",
//     "databaseURL": "https://nudgeeffectv1.firebaseio.com",
//     "storageBucket": "nudgeeffectv1.appspot.com",
//     "locationId": "europe-west"
//   }
// }

// apiKey: "AIzaSyAbEAxtAKlvG4wbjAxvL0h5neYaQDk7qP8",
// authDomain: "scorethical-5fa1d.firebaseapp.com",
// databaseURL: "https://scorethical-5fa1d.firebaseio.com",
// projectId: "scorethical-5fa1d",
// storageBucket: "scorethical-5fa1d.appspot.com",
// messagingSenderId: "697071229819",
// appId: "1:697071229819:web:abb313dada23ac43f5bbde",
// measurementId: "G-1TMVWD9W7M"