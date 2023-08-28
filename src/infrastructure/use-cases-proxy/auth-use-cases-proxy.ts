import { Provider } from '@nestjs/common';
import { UseCaseProxy } from './use-cases.provider';
import { IsFirebaseAuthUser } from '@use-cases/auth/isFirebaseAuthUser.usecase';
import { FirebaseApp } from '../repositories/firebase/firebase-app/firebase-app';

export enum AUTH_USE_CASES {
  LOGIN_USECASES_PROXY = 'LoginUseCasesProxy',
  IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy',
  LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy',
}

export const authUseCaseExports: string[] = [
  // AUTH_USE_CASES.LOGIN_USECASES_PROXY,
  AUTH_USE_CASES.IS_AUTHENTICATED_USECASES_PROXY,
  // AUTH_USE_CASES.LOGOUT_USECASES_PROXY,
];

export const authUseCasesProviders: Provider[] = [
  {
    inject: [FirebaseApp],
    provide: AUTH_USE_CASES.IS_AUTHENTICATED_USECASES_PROXY,
    useFactory: (firebaseApp: FirebaseApp) =>
      new UseCaseProxy(new IsFirebaseAuthUser(firebaseApp)),
  },
  //   {
  //     inject: [],
  //     provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
  //     useFactory: () => new UseCaseProxy(new LogoutUseCases()),
  //   },
];
