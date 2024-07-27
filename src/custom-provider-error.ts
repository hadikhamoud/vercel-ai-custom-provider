import { createJsonErrorResponseHandler } from '@ai-sdk/provider-utils';
import { z } from 'zod';

const customProviderErrorDataSchema = z.object({
  object: z.literal('error'),
  message: z.string(),
  type: z.string(),
  param: z.string().nullable(),
  code: z.string().nullable(),
});

export type CustomProviderErrorData = z.infer<typeof customProviderErrorDataSchema>;

export const customProviderFailedResponseHandler = createJsonErrorResponseHandler({
  errorSchema: customProviderErrorDataSchema,
  errorToMessage: data => data.message,
});
