import { Module, DynamicModule } from '@nestjs/common';
import {
  authUseCaseExports,
  authUseCasesProviders,
} from './auth-use-cases-proxy';
import { MongoDbRepositoriesModule } from '@infrastructure/repositories/mongo-db/mongo-db-repositories.module';
import { EnvironmentConfigModule } from '@infrastructure/config/environment-config/environment-config.module';
import { FirebaseModule } from '@infrastructure/repositories/firebase/firebase.module';
import {
  postsUseCaseExports,
  postsUseCasesProviders,
} from './posts-use-cases-proxy';
import {
  commentsUseCaseExports,
  commentsUseCasesProviders,
} from './comment-use-cases-proxy';

@Module({
  imports: [EnvironmentConfigModule, MongoDbRepositoriesModule, FirebaseModule],
})
export class UseCasesProxyModule {
  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        ...authUseCasesProviders,
        ...postsUseCasesProviders,
        ...commentsUseCasesProviders,
      ],
      exports: [
        ...authUseCaseExports,
        ...postsUseCaseExports,
        ...commentsUseCaseExports,
      ],
    };
  }
}
