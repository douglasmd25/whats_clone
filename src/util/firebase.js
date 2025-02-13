const firebase = require('firebase');
require('firebase/firestore')


export class Firebase{

    constructor(){

        this._config = {
            
            apiKey: "AIzaSyCc42xGJWjX8xZPbFjnzonovhM9dEDXil4",
            authDomain: "whtasappclone-2457d.firebaseapp.com",
            projectId: "whtasappclone-2457d",
            storageBucket: "whtasappclone-2457d.firebasestorage.app",
            messagingSenderId: "62637730531",
            appId: "1:62637730531:web:c861edd11e99ed9fef33d6"
        };

        this.init();
    }

    init(){

        if(!window._initializedFirebase){
            
            firebase.initializeApp(this._config);

            firebase.firestore().settings({

                //timestampsInSnapshots: true
            });

            window._initializedFirebase = true;

        }        
    }

    static db(){

        return firebase.firestore();
    }

    static hd(){

        return firebase.storage();
    }

    initAuth(){

        return new Promise((s, f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
                .then(result =>{

                    let token = result.credential.accessToken;
                    let user = result.user;

                    s({user, token});
                })
                .catch(err=>{
                    f(err);
                });
        });
    }

}