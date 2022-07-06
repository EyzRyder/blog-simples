

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
// your firebase api key
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
var user;

firebase.auth().onAuthStateChanged(function (userLoggedIn) {
    user = userLoggedIn;
    UserSentFromAuth(user);
});

function GetPosts() {
    return db.collection("posts").get();
}

function GetUser() {
    return user;
}

function AddPostToDB(post) {
    post.displayName = user.displayName;
    db.collection("posts").doc().set(post).catch(erro => {
        console.log("There was an error");
    });
}

function UpdatePost(post) {
    db.collection("posts").doc(post.id).set(post).catch(error => {
        console.log(error);
    });
}

function Login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        SubmitModalError(error);
    }).then(userData => {
        if (userData != null) {
            user = userData.user;
            console.log(user);
        }
        SubmitModalError("");
    })
}

function SignOut() {
    firebase.auth().signOut();
}

function SignUp(email, password, displayName) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        SubmitModalError(error);
    }).then(userData => {
        if (userData != null) {
            userData.user.updateProfile({
                displayName: displayName
            })
            user = userData.user;
            console.log(user);
            SubmitModalError("");
        }
    })
}

function ResetPassword(email) {
    firebase.auth().sendPasswordResetEmail(email).then(function() {
            SubmitModalError("");
        }).catch( function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            SubmitModalError(error);
        });
}