


export const API = {

    baseEndPoint: `https://us-central1-nudgeeffectv1.cloudfunctions.net/v2`,//`https://us-central1-scorethicalv2.cloudfunctions.net`,
    trackingEndPoint: `https://us-central1-nudgeeffectv1.cloudfunctions.net/v2/track`,

    endpoint: gtin => `https://scorethical-5fa1d.firebaseio.com/0/${gtin}.json`,

}

export const settings = {
    overviewBatchSize: 3,

    showDifferentNutriAlert: false,

    disableApi: false,

    defaultGroup: 'A',
    maxBudget: {de: 25, ch: 25},
    showDiscount: false
}

// https://us-central1-nudgeeffectv1.cloudfunctions.net/bfc
// https://us-central1-nudgeeffectv1.cloudfunctions.net/group