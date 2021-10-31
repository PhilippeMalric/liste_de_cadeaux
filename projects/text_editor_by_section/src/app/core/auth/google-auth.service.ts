import { Injectable } from '@angular/core';

import 'firebase/auth';
import {
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import { ActionAuthLogin } from './auth.actions';
import { LocalStorageService, NotificationService } from '../core.module';
import { AUTH_KEY } from './auth.effects';
import { take } from 'rxjs/operators';
import * as firebase from 'firebase';
import { GameService } from '../../services/game.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  public authState: any;
  logedIn: boolean;
  user$: any;

  constructor(
    private notificationService: NotificationService,
    private gameService: GameService,
    private storageService: LocalStorageService,
    private store: Store,
    private router: Router,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.user$ = afAuth.authState;

    if (this.user$) {
      this.logedIn = true;
    } else {
      this.logedIn = false;
    }
  }

  signInLink(email) {
    var actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      //url:"https://votoire-ec754.firebaseapp.com/",
      url: 'http://localhost:4200',
      // This must be true.
      handleCodeInApp: true
    };

    firebase
      .auth()
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email);
        // Confirm the link is a sign-in with email link.

        // ...
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }

  loginEmail = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Signed in
        var user = userCredential.user;
        console.log('user');
        console.log(user);
        if (user.emailVerified) {
          this.setNameAndPw(user);
          this.store.dispatch(new ActionAuthLogin());
        } else {
          this.notificationService.error('Vérifiez votre adresse courriel.');
        }
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  enregistrement = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Signed in
        var user = userCredential.user;
        var actionCodeSettings = {
          // URL you want to redirect back to. The domain (www.example.com) for this
          // URL must be in the authorized domains list in the Firebase Console.
          url: 'https://votoire-ec754.firebaseapp.com/',
          //url: 'http://localhost:4200',
          // This must be true.
          handleCodeInApp: true
        };
        user.sendEmailVerification(actionCodeSettings);
        /*
    this.store.dispatch(new ActionAuthLogin())
    console.log("user")
    console.log(user)
    this.setNameAndPw(user)
    */
        this.notificationService.info(
          "Vérifiez votre adresse courriel. N'oubliez pas de vérifier les pourriels ..."
        );
        //this.router.navigate(["mode_d_emploi"])
        //".", "#", "$", "[", or "]"
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        //this.loginEmain(email,password)
      });
  };

  setNameAndPw = user => {
    if (user.displayName) {
      this.gameService.user.next(user.displayName);
    } else {
      this.gameService.user.next(
        ('' + user.email)
          .split('@')[0]
          .replace('.', '_')
          .replace('#', '_')
          .replace('$', '_')
          .replace('[', '_')
          .replace(']', '_')
      );
    }
    this.gameService.userEmail.next(user.email);
  };

  reset_password = email => {
    var actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: 'https://projet-de-loi-accq.web.app/authentification',
      //url: 'http://localhost:4200',
      // This must be true.
      handleCodeInApp: true
    };
    firebase.auth().useDeviceLanguage();
    firebase
      .auth()
      .sendPasswordResetEmail(email, actionCodeSettings)
      .then(data => {
        this.notificationService.info(
          "Vérifiez votre adresse courriel. N'oubliez pas de vérifier les pourriels ..."
        );
        console.log(data);
        //this.gameService.user.next()
        //this.router.navigate(['/authentification'])
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  checkAuth(email) {
    console.log('isSignInWithEmailLink');
    console.log(firebase.auth().isSignInWithEmailLink(email));

    console.log(
      firebase
        .auth()
        .getRedirectResult()
        .then(data => {
          console.log('data');
          console.log(data);
        })
    );
    if (firebase.auth().isSignInWithEmailLink(email)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      //var email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation');
      }
      // The client SDK will parse the code from the link for you.
      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then(result => {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');
          this.store.dispatch(new ActionAuthLogin());
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch(error => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
  }

  logout() {
    const uid = this.afAuth.currentUser.then(authState => {
      let uid = authState.uid;
      console.log(authState);
      const status = 'offline';
      this.setStatus(uid, status);
      this.authState = null;
      this.afAuth.signOut().then(() => this.router.navigate(['/']));
    });
  }

  setStatus(uid: string, status: string) {
    const path = 'users/' + uid;
    const data = {
      status
    };
    this.db.object(path).update(data);
  }
  googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider().addScope('email');
    this.oAuthLogin(provider);
  }

  oAuthLogin = async provider => {
    const credential: any = await this.afAuth.signInWithPopup(provider);
    if (credential) {
      if (credential.user.displayName) {
        this.gameService.user.next(credential.user.displayName);
      } else {
        this.gameService.user.next(
          ('' + credential.additionalUserInfo.profile.email)
            .split('@')[0]
            .replace('.', '_')
            .replace('#', '_')
            .replace('$', '_')
            .replace('[', '_')
            .replace(']', '_')
        );
      }
      this.gameService.userEmail.next(
        credential.additionalUserInfo.profile.email
      );

      this.store.dispatch(new ActionAuthLogin());
    }
  };

  private updateUserData({ uid, email, displayName, photoURL }: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${uid}`
    );

    const data = {
      uid,
      email,
      displayName,
      photoURL
    };

    return userRef.set(data, { merge: true });
  }
  setUserData(email: string, displayName: string, status: string, uid) {
    const path = `users/${uid}`;
    const data = {
      status
    };
    this.db.object(path).update(data);
  }

  get() {
    this.user$.pipe(take(1)).subscribe((user: User) => {
      const path = `users/${user.uid}`;

      this.db
        .object(path)
        .valueChanges()
        .pipe(take(1))
        .subscribe(data => {
          console.log('data');
          console.log(data);
        });
    });
  }
}
