var state;
var user;

function SubmitModal() {
    var displayName = $("#user-display-name").val();
    var email = $("#user-email").val();
    var password = $("#user-password").val();

    if (state == "login") {
        Login(email, password);
    } else if (state == "signUp") {
        if (displayName != "") {
            SignUp(email, password, displayName);
        } else {
            SubmitModalError("No-display-name")
        }
    } else if (state == "forgotPassword") {
        ResetPassword(email);
    } else {
        console.log("Invalid state : " + state);
    }

}

function UserSentFromAuth(userLoggedIn) {
    user = userLoggedIn;
    if (user != null) {
        $("#LoginButton").text("Sign Out");
    } else {
        $("#LoginButton").text("Sign In");
    }
}

function DetermineLoginButtonAction() {
    if (user != null) {
        SignOut();
    } else {
        SetModal("login")
        $("#LoginModal").modal("show");
    }
}

function SetModal(NewModalState) {
    state = NewModalState;
    console.log("Setting state to " + NewModalState);

    $("#model-error").text("");
    $("#forgot-password-link").css("display", "");
    $("#sign-up-link").css("display", "");
    $("#login-link").css("display", "");
    $("#user-password").css("display", "");
    $("#user-display-name").css("display", "");


    if (NewModalState == "signUp") {
        $("#modal-header-text").text("Sign Up");
        $("#submit-modal-button").text("Sign Up");
        $("#forgot-password-link").css("display", "none");
        $("#sign-up-link").css("display", "none");

    } else if (NewModalState == "forgotPassword") {
        $("#modal-header-text").text("Forgot Password");
        $("#submit-modal-button").text("Forgot Password");
        $("#forgot-password-link").css("display", "none");
        $("#user-password").css("display", "none");
        $("#user-display-name").css("display", "none");


    } else if (NewModalState == "login") {
        $("#modal-header-text").text("Login");
        $("#submit-modal-button").text("Login");
        $("#user-display-name").css("display", "none");
        $("#login-link").css("display", "none");

    } else {
        console.log("error");
    }
}

function SubmitModalError(error) {
    console.log(error);
    if (error.code == "auth/wrong-password") {
        $("#model-error").text("Username/Password combination is incorrect");
    } else if (error.code == "auth/invalid-email") {
        $("#model-error").text("You have entered an invalid email");
    } else if (error.code == "auth/too-many-requests") {
        $("#model-error").text("You have tried to many times with this email, check back later!");
    } else if (error.code == "auth/weak-password") {
        $("#model-error").text("Password should be at least 6 characters");
    } else if (error.code == "auth/email-already-in-use") {
        $("#model-error").text("There is already a account with this email!");
    } else if (error == "no-display-name") {
        $("#model-error").text("Please enter a display name!");
    } else if (error == "") {
        $("#LoginModal").modal("hide");
    } else {
        $("#model-error").text(error.code);
    }
}