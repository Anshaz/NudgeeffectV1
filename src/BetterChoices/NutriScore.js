import $ from 'jquery';
import BetterFoodChoice from '../BetterChoices/App';



/**
 * Utility function to convert array of ranges into class 
 *
 * @param {*} value
 * @param {*} intervals
 * @param {*} defaultClass
 * @returns
 */
const fromClassRange = (value, intervals, defaultClass) => {
    for (let i = 0; i < intervals.length; i++)
        if (intervals[i] && value <= intervals[i])
            return i

    //default class
    return defaultClass || 10
}

export /**
 * Calculate score
 *
 * @param {*} productCategory
 * @param {*} {
 *     energy,
 *     fibers,
 *     protein,
 *     fruitvegetables,
 *     sodium,
 *     acids,
 *     sugar,
 *     natrium
 * }
 * @returns
 */
    const getScoreLocal = (productCategory, {
        energy,
        fibers,
        protein,
        fruitvegetables,
        sodium,
        acids,
        sugar
    }) => {

        if (productCategory === 'unknown')
            return

        // Code for calculation of NutriScore based
        // on the recognized values on the website.

        let scores = {
            energy: 0,
            acids: 0,
            sugar: 0,
            sodium: 0,

            fruitvegetables: 0,
            fibers: 0,
            protein: 0

        }

        if (['cheese', 'food', 'meat', 'fish', 'milk, cheese, eggs', 'bread & cereals', 'other food products', 'fruits, vegetables, potatoes', 'food in general'].indexOf(productCategory) > -1) {

            //energy
            scores.energy = fromClassRange(energy.toNumber(), [335, 670, 1005, 1340, 1675, 2010, 2345, 2680, 3015, 3350]);

            //acids
            scores.acids = fromClassRange(acids.toNumber(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

            //sugar
            scores.sugar = fromClassRange(sugar.toNumber(), [4.5, 9, 13.5, 18, 22.5, 27, 31, 36, 40, 45]);

            //sodium
            scores.sodium = fromClassRange(sodium.toNumber(), [0.09, 0.18, 0.27, 0.36, .45, .540, .630, .720, .810, .900]);

            // fruitvegetables
            scores.fruitvegetables = fromClassRange(fruitvegetables.toNumber(), [40, 60, false, false, 80], 5);

            // ovveride if fruit category
            if (productCategory === 'fruits, vegetables, potatoes') {
                scores.fruitvegetables = 5;
            }

            // fibers
            scores.fibers = fromClassRange(fibers.toNumber(), [0.9, 1.9, 2.8, 3.7, 4.7], 5);

            //proteins
            scores.protein = fromClassRange(protein.toNumber(), [1.6, 3.2, 4.8, 6.4, 8.0], 5);



        } else if (['water', 'drink', 'non-alcoholic beverages'].indexOf(productCategory) > -1) { //drink

            scores.energy = fromClassRange(acids, [0, 30, 60, 90, 120, 150, 180, 210, 240, 270]);

            scores.acids = 0;

            scores.sugar = fromClassRange(acids, [0, 1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 13.5]);

            scores.sodium = 0;

            // false values to skip classes as in the original file 
            scores.fruitvegetables = fromClassRange(fruitvegetables.toNumber(), [40, false, 60, 64, 68, 72, 76, 80]);

            scores.fibers = 0;

            scores.protein = 0;

        } else {
            return "-" // nutriscore not calculable
        }

        // console.log(scores, {
        //     energy: energy.toNumber(),
        //     fibers: fibers.toNumber(),
        //     protein:protein.toNumber(),
        //     fruitvegetables:fruitvegetables.toNumber(),
        //     sodium:sodium.toNumber(),
        //     acids:acids.toNumber(),
        //     sugar:sugar.toNumber()
        // })

        const badIngredientScore = scores.energy + scores.acids + scores.sodium + scores.sugar


        // Calculating Nutriscore.
        const goodIngredientScore = scores.fruitvegetables + scores.fibers + scores.protein;

        let nutriScoreNumber, nutriScore;

        if (badIngredientScore <= 11) {
            nutriScoreNumber = badIngredientScore - goodIngredientScore;
        } else {
            if (scores.fruitvegetables >= 5) {
                nutriScoreNumber = badIngredientScore - goodIngredientScore;
            } else {
                nutriScoreNumber = badIngredientScore - scores.fruitvegetables - scores.fibers;
            }
        }

        // ovverrides
        if (productCategory === 'cheese') {
            nutriScore = badIngredientScore - goodIngredientScore
        }

        if (['cheese', 'food', 'meat', 'fish', 'milk, cheese, eggs', 'bread & cereals', 'other food products', 'fruits, vegetables, potatoes', 'food in general'].indexOf(productCategory) > -1) {
            // console.log("FOOD", productCategory)
            if (nutriScoreNumber <= -1) {
                nutriScore = "A";
            } else if (nutriScoreNumber <= 2) {
                nutriScore = "B";
            } else if (nutriScoreNumber <= 10) {
                nutriScore = "C";
            } else if (nutriScoreNumber <= 18) {
                nutriScore = "D";
            } else if (nutriScoreNumber <= 40) {
                nutriScore = "E";
            }
        } else { // drink
            // console.log("DRINK", productCategory)
            if (productCategory === 'water') {
                nutriScore = "A";
            } else if (nutriScoreNumber <= 1) {
                nutriScore = "B";
            } else if (nutriScoreNumber <= 5) {
                nutriScore = "C";
            } else if (nutriScoreNumber <= 9) {
                nutriScore = "D";
            } else if (nutriScoreNumber <= 30) {
                nutriScore = "E";
            }
        }


        return nutriScore;

    }


export /**
 * display score 
 * 
 * @param {*} score
 * @param {*} group
 * @param {*} parent
 * @param {string} [size='big','small']
 * @returns
 */
    const displayScore = (score, group, parent, size = 'big') => {


        if(!score)
        return

    // if group B do not render < B, if group C do no render
    // if((group === 'B' && ['C','D','E'].indexOf(score) >= 0) || group === 'C')
    //     return


    if(parent.find('.nutriscore').length)
        return
        // if group B do not render < B, if group C do no render
        // if (group == 'B')
        //     {
        //         return console.log("wtf?!?")
        //     }
        switch (group) {

                case 'A' :
                    // console.log("A:This is Nudging Group: Nudging Info-> Yes! Filter->Selected")
                    var score_card = document.querySelectorAll("img[src='chrome-extension://oapimnhjklkefjecdnlaeebmeipodmlm/nsE.png'],img[src='chrome-extension://oapimnhjklkefjecdnlaeebmeipodmlm/nsD.png']");
                    $(score_card).parent().parent().parent().parent().parent().css({"display": "none"})
                    break;
                case 'B':
                    console.log("B:This is Control Group: Nudging Info-> No! Filter->Unselected")
                    break;
                case 'C':
                    console.log("C: This is Self-Nudging Group: Nudging Info-> Yes! Filter->Unselected")
                    break;
                default:
                    console.log(`Sorry, we are out of ${expr}.`);
        }
        
        // if (parent.find('.nutriscore').length)
        //     return

        

        // else render badge
        const img = $('<img class="nutriscore" />')
            .attr("src", chrome.runtime.getURL(`ns${score.slice(0, 1)}.png`))
            .css({
                height: size === 'big' ? 72 : 62,
                zIndex: 1,
                display: 'block',
                textAlign: 'center',
            })
            .appendTo(parent)

        if ($($(parent).closest(".search-service-product")).find(".search-service-productPrice").length > 0) {
            $($($(parent).closest(".search-service-productDetails")).find(".search-service-productGrammage")).appendTo($($(parent).closest(".search-service-product")).find(".search-service-productPrice"));
            //$($(".search-service-basketButtons")[0]).css({margin: "25px 10px 16px"})
            //adapt Grammage
            // $($($(".search-service-productDetailsFill")[1].closest(".search-service-productDetails")).find(".search-service-productGrammage")).appendTo($(".search-service-productDetailsFill")[1].closest(".search-service-productDetails"))
        } else {
            $($($(parent).closest(".search-service-productDetails")).find(".search-service-productGrammage")).appendTo($($(parent).closest(".search-service-product")).find(".search-service-productOfferPrice"));
        }
        $($($(parent).closest(".search-service-product")).find(".search-service-basketButtons")).css({ margin: "18px 10px 16px" });

    }

export /**
* display button 
* 
* @param {*} group
* @returns
*/      
       const displayCheckbox = (group) => {

        switch (group) {

            case 'B' :
                function createCheckBox() {
                    return $("<input/>", {
                        type: "checkbox",
                        id: "check",
                        value: "sust",
                        click: ClickCheckbox
            
                    }); 
                }
                function ClickCheckbox() {
                    var score_card = document.querySelectorAll("img[src='chrome-extension://oapimnhjklkefjecdnlaeebmeipodmlm/nsE.png'],img[src='chrome-extension://oapimnhjklkefjecdnlaeebmeipodmlm/nsD.png']");
                    var div_card = $(score_card).parent().parent().parent().parent().parent()
                    $(div_card).toggle();
                }
                $(".style_simpleFacetGroupList__Zc3jl").after("<span1>  Nachhaltig  </span1>").prop('title', 'Nachhaltig filter').css({"font-size": "10.05rem","color": "#4a4a4a"})
                $("span1").css({
                "font-size": "1.05rem",
                "color": "#4a4a4a",
                "border": "solid #ccc",
                "border-width": "15px 0px 0px",
                "border-color": "rgb(169 201 56)",
                "display": "block",
                "padding": "16px 8px",
                "margin": "0"
                }).append(createCheckBox(), ClickCheckbox());
            
                console.log("B:This is Control Group: Nudging Info-> No! Filter->Unselected")
                // var score_card = document.querySelectorAll("img[src='chrome-extension://oapimnhjklkefjecdnlaeebmeipodmlm/nsE.png'],img[src='chrome-extension://oapimnhjklkefjecdnlaeebmeipodmlm/nsD.png']");
                // $(score_card).parent().parent().parent().parent().parent().remove()
                // BetterFoodChoice.showAlert("B:This is Control Group: Nudging Info-> No! Filter->Unselected", () => {

                // },)
                break;
            case 'A':
                function createCheckBoxB() {
                    return $("<input/>", {
                        type: "checkbox",
                        id: "check",
                        value: "sust",
                        click: ClickCheckboxB
            
                    }); 
                }

                function ClickCheckboxB() {
                    var score_card = document.querySelectorAll("img[src='chrome-extension://oapimnhjklkefjecdnlaeebmeipodmlm/nsE.png'],img[src='chrome-extension://oapimnhjklkefjecdnlaeebmeipodmlm/nsD.png']");
                    var div_card = $(score_card).parent().parent().parent().parent().parent()
                    
                    $(div_card).toggle();
                    console.log("A: This is Nudging Group: Nudging Info-> Yes! Filter->Selected")
                    
                }
                $(".style_simpleFacetGroupList__Zc3jl").after("<span1>  Nachhaltig  </span1>").prop('title', 'Nachhaltig filter').css({"font-size": "10.05rem","color": "#4a4a4a"})
                $("span1").css({
                "font-size": "1.05rem",
                "color": "#4a4a4a",
                "border": "solid #ccc",
                "border-width": "15px 0px 0px",
                "border-color": "rgb(169 201 56)",
                "display": "block",
                "padding": "16px 8px",
                "margin": "0"
                }).append(createCheckBoxB(), ClickCheckboxB());
                $('#check').trigger('click');
                
                // alert("Sustainability filter has been selected for you")
                BetterFoodChoice.showAlert("Nachhaltigkeitsfilter wurde für Sie vor ausgewählt","Sie können die Checkbox -Nachhaltig- auf der linken Seite frei umschalten", () => {

                },)
                break;
            case 'C':
                function createCheckBoxC() {
                    return $("<input/>", {
                        type: "checkbox",
                        id: "check",
                        value: "sust",
                        click: ClickCheckboxC
            
                    }); 
                }
                function ClickCheckboxC() {
                    var score_card = document.querySelectorAll("img[src='chrome-extension://oapimnhjklkefjecdnlaeebmeipodmlm/nsE.png'],img[src='chrome-extension://oapimnhjklkefjecdnlaeebmeipodmlm/nsD.png']");
                    var div_card = $(score_card).parent().parent().parent().parent().parent()
                    $(div_card).toggle();
                }
                $(".style_simpleFacetGroupList__Zc3jl").after("<span1>   Nachhaltig  </span1>").prop('title', 'Nachhaltig filter').css({"font-size": "10.05rem","color": "#4a4a4a"})
                $("span1").css({
                "font-size": "1.05rem",
                "color": "#4a4a4a",
                "border": "solid #ccc",
                "border-width": "15px 0px 0px",
                "border-color": "rgb(169 201 56)",
                "display": "block",
                "padding": "16px 8px",
                "margin": "0"
                }).append(createCheckBoxC(), ClickCheckboxC());
                console.log("C: This is Self-Nudging Group: Nudging Info-> Yes! Filter->Unselected")
                // alert("You can select sustainability filter")
                // BetterFoodChoice.showAlert("You can select sustainability filter","To see only sustainable products, you can click -Shop Sustainable- checkbox on the left hand side", () => {

                // },)
                break;
            default:
                console.log(`Sorry, we are out of ${group}.`);
            }
            
            // var click_array= []
            // var count = 0
            // $( '#check' ).on( "click", function() {
            //     count += 1
            //     click_array.push(count)
            //     console.log("checkbox click outside scope: nutriscore:", click_array)
            // });
       }   




const getNutriscore = (store, body = false) => {

}

window.getScoreLocal = getScoreLocal;



