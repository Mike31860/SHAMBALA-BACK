import { User } from '@domain/models/user.model';
import { AuthRepository } from '@domain/repositories/auth.repository';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config/environment-config.service';
import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';

@Injectable()
export class FirebaseApp implements AuthRepository {
  private firebaseApp: firebase.app.App;

  constructor(readonly envConfigService: EnvironmentConfigService) {
    const serviceAccountPath = envConfigService.getFirebaseServiceAccountPath();
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccountPath),
    });
  }
  async verifyToken(accessToken: string): Promise<Partial<User>> {
    const decodedToken = await firebase
      .auth(this.firebaseApp)
      .verifyIdToken(accessToken);
    const user: Partial<User> = {
      password: '',
      username: decodedToken.uid,
      accessToken: accessToken,
    };

    return user;
  }

  getInstance() {
    return this.firebaseApp;
  }
}
