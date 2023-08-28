import { EnvironmentConfigService } from '@infrastructure/config/environment-config/environment-config.service';
import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';

@Injectable()
export class FirebaseApp {
  private firebaseApp: firebase.app.App;

  constructor(readonly envConfigService: EnvironmentConfigService) {
    const serviceAccountPath = envConfigService.getFirebaseServiceAccountPath();
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccountPath),
    });
  }

  getInstance() {
    return this.firebaseApp;
  }
}
