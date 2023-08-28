import { Provider } from '@nestjs/common';
import { UseCaseProxy } from './use-cases.provider';
import { IsAppAuthUserUseCase } from '@domain/use-cases/auth';
import { FirebaseApp } from '../repositories/firebase/firebase-app/firebase-app';
import { AuthRepository } from '@domain/repositories/auth.repository';

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
    useFactory: (authRepository: AuthRepository) =>
      new UseCaseProxy(new IsAppAuthUserUseCase(authRepository)),
  },
  //   {
  //     inject: [],
  //     provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
  //     useFactory: () => new UseCaseProxy(new LogoutUseCases()),
  //   },
];
