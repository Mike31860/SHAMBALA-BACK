import { AuthToken, UserId } from '@domain/models/user.model';
import { IsAuthUserUseCase } from '@domain/use-cases/auth';
import { FirebaseApp } from '@infrastructure/repositories/firebase/firebase-app/firebase-app';
import { Inject } from '@nestjs/common';
import { auth } from 'firebase-admin';

export class IsFirebaseAuthUser implements IsAuthUserUseCase {
  constructor(@Inject() private readonly firebaseApp: FirebaseApp) {}

  async execute(accessToken: AuthToken): Promise<UserId> {
    const decodedToken = await auth(
      this.firebaseApp.getInstance(),
    ).verifyIdToken(accessToken);
    return decodedToken.uid;
  }
}
