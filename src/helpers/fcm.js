import https from "https";
import { google } from "googleapis";

// import key from './alertapersona-firebase-adminsdk-ulmcu-bc3a5f970c.json' assert { type: 'json' };
const key = {
  "type": "service_account",
  "project_id": "alertapersona",
  "private_key_id": "bc3a5f970c37e914fdfc4f99db7aa5144e71d382",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDHWiahP5DSPnnA\nmJVGgW9KNgXGUcfa785tsqzK35NTfRSgQV8VxRsFMPEKqwKiBGgzSscvQmEDaG/B\nPAj71fKcjQkKuF0FsNSPOVWEQt/N++TL2nmBH0WnZY4k8mh77g4hX17lcTtkL4+z\nObvxFTXRtVh3pGaeAn8N8xoAGepbY9QvkxZWfBiI97VunXDvrOmdcbH9f/1v7aLg\nY1kr+yNO05EpaTM62d3IwVIYDmS4ZCqyEQYD2Hntjp5OsfW+7vSW0j14bHV8TSVR\nDcYD7lqLNPLpy/NcjbvBe/EfXyX8GDRYlgw1L0lntfNthozjWQ/1jVY3gHealmMR\n/TD5cRrxAgMBAAECggEAG56p631bG0X8qGp7hCE6whVqB2gdQIApIZm3xwPi7ZZO\n3UUxX1rHu5hkTQ4Ud04VAcZCgpG3zzkRArzGod2ql3YS4qFYgglV6eIPrxt01p0n\nvfavDuy+QcsYPpY3U7RP0N/dzfw6Nk9AoZxGJcjChCOT9j+Y2BuQbuZXm9v7VF3p\nw9rtgNin0Jk4qOUrmwugsn1eUUp5JW71/THPolcT9inRvI3wm4apyMqK6n1f8+bq\nmya4yP7mA9yXDZomxBV02k6kIKbfym9k5dkXYQgr0c3pj2gqmWkmLUDkqejasogY\nYKZmvow6A712uCjnPWn5KDTIYBrXqlZgt3hyORcUgQKBgQDtJXqMMjcPtTfqBt80\nPQZzQRLIGuVVGILlLm0Pw9qGxQMqbZJszLIvDqrYeZ5AT34UlPSvofjg4p/w0Vzk\nzSXpcmlv2R7gkghuSCdmmIjWgjqB3Wgw42RbMv7FDHI6WWVGvA98a6uLx9IzO1uD\n4NEytmP8tU5D81b090tK0uZGVQKBgQDXM3cBzXwM2gkQI3ZilZNpGz28It0gVklD\nVF06LYVBRKHw0QzDAXXMg9VpdoHkUT9yTj5I23RDey7goLW0Svv912XqSYJZG3Yh\nHw+ASkDW+2V7uZBctJnwRwP/VfvnB3D8QE9Rnwb+z0UeiwuzWRuj5TmSqSAqCL2n\nAPMJEU3GLQKBgQCzHrTigec+8RULqicbUOC3WzZxeIcx8DKmIpvz5W4Aj3xlpp+L\nmE0Z6A05NxtF3gUQTLZIlqHiUqqV/b0ZgK6bFnT3K1r8KrE9gzhncN0ikPjaMD7L\ndmXN0MXIVi9NTUqG0/MqejT3fnWRhssH4F6C3GrHbLZx8rICk2sGWCfghQKBgQCJ\nGWh/5YFaTq3ncjBBrjkzhP9XlH5703zpQB4EqmtyoV7qJMSUl6GMoZCcl7s40eox\n0Fct42G2fAvpX3ljW0Ie/dMX56z7R9uCTl95w9R7Ib4NjLLD3OsVgKizSvwouzzn\n97CQt1eljjbitoLFx8csKyT6onSzUs5ATwKGjFeYIQKBgCMin4QXzyEunMPFcjmo\nulXI/9SzIiC4GU+/lNeRXsrhZ3C73JKrD80g0V1dKHK3GK1sZLfmiaHlayI0X5Nk\nOTFswdU46f0oHhekhu9y0nyUP6rEej2oSLgMEtQzLfD4+kJodnXwYpkaiGwlmbdq\nMs2vKmmvB/QTNhGnX+KTaZmX\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-ulmcu@alertapersona.iam.gserviceaccount.com",
  "client_id": "112013409992188144887",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ulmcu%40alertapersona.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

const PROJECT_ID = "alertapersona";
const HOST = "fcm.googleapis.com";
const PATH = "/v1/projects/" + PROJECT_ID + "/messages:send";
const MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
const SCOPES = [MESSAGING_SCOPE];

/**
 * Get a valid access token.
 */
// [START retrieve_access_token]
function getAccessToken() {
  return new Promise(function (resolve, reject) {
    // const key = require("../../cert/alertapersona-firebase-adminsdk-ulmcu-bc3a5f970c.json");
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    );
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}
// [END retrieve_access_token]

/**
 * Send HTTP request to FCM with given message.
 *
 * @param {object} fcmMessage will make up the body of the request.
 */
export async function sendFcmMessage(fcmMessage) {
  getAccessToken().then(function (accessToken) {
    const options = {
      hostname: HOST,
      path: PATH,
      method: "POST",
      // [START use_access_token]
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      // [END use_access_token]
    };

    const request = https.request(options, function (resp) {
      resp.setEncoding("utf8");
      resp.on("data", function (data) {
        console.log("Message sent to Firebase for delivery, response:");
        // console.log(data);
      });
    });

    request.on("error", function (err) {
      console.log("Unable to send message to Firebase");
      console.log(err);
    });

    request.write(JSON.stringify(fcmMessage));
    request.end();
  });
}

export function emitirNotificacion(para, data){

  const notificacion = {
    'message': {
      'token': para,
      'notification': {
        'title': 'Nueva alerta',
        'body': 'Se emitio una nueva alerta'
      },
      'data': data
    }
  }

  // console.log(notificacion);

  sendFcmMessage(notificacion)

}