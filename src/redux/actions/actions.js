import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

export const PUT_LOGO = 'PUT_LOGO';
export const PUT_SHELF = 'PUT_SHELF';
export const PUT_WHISKEY = 'PUT_WHISKEY';

firebase.initializeApp({
  storageBucket: "sofakingwasted-e795e.appspot.com",
  projectId: "sofakingwasted-e795e",
  databaseURL: "sofakingwasted-e795e.firebaseio.com",
})
const storage = firebase.storage();
const firestore = firebase.firestor();

export const getLogo = () => dispatch => {
  storage.ref('asset/log.svg').getDownloadURL().then(res => {
    dispatch({
      type: PUT_LOGO,
      payload: res
    });
  });
}

export const getShelf = () => dispatch => {
  storage.ref('asset/shelf.png').getDownloadURL().then(res => {
    dispatch({
      type: PUT_SHELF,
      payload: res
    })
  })
}

export function putShelf(shelf_url) {
  return { type: PUT_SHELF, shelf_url: shelf_url };
}

export function putWhiskey(id, whiskey, img_url) {
  return { type: PUT_WHISKEY, whiskey: whiskey };
}
