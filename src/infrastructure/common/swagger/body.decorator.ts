import { applyDecorators, Type } from '@nestjs/common';
import { ApiBody, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseFormat } from '../interceptors/response.interceptor';

export const ApiBodyType = <TModel extends Type<any>>(
  model: TModel,
  isArray?: boolean,
) => {
  return applyDecorators(
    ApiBody({
      isArray: isArray,
      schema: {
        allOf: [
          {
            properties: {
              data: {
                $ref: getSchemaPath(model),
              },
              isArray: {
                type: 'boolean',
                default: isArray,
              },
            },
          },
        ],
      },
    }),
  );
};
