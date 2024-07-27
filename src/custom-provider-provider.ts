import {
  generateId,
  loadApiKey,
  withoutTrailingSlash,
} from '@ai-sdk/provider-utils';
import { CustomProviderChatLanguageModel } from './custom-provider-chat-language-model';
import {
  CustomProviderChatModelId,
  CustomProviderChatSettings,
} from './custom-provider-chat-settings';


export interface CustomProviderProvider {
  (
    modelId: CustomProviderChatModelId,
    settings?: CustomProviderChatSettings,
  ): CustomProviderChatLanguageModel;

  /**
Creates a model for text generation.
*/
  languageModel(
    modelId: CustomProviderChatModelId,
    settings?: CustomProviderChatSettings,
  ): CustomProviderChatLanguageModel;

  /**
Creates a model for text generation.
*/
  chat(
    modelId: CustomProviderChatModelId,
    settings?: CustomProviderChatSettings,
  ): CustomProviderChatLanguageModel ;

}

export interface CustomProviderProviderSettings {
  /**
Use a different URL prefix for API calls, e.g. to use proxy servers.
   */
  baseURL?: string;

  /**
@deprecated Use `baseURL` instead.
   */
  baseUrl?: string;

  /**
API key that is being send using the `Authorization` header.
   */
  apiKey?: string;

  /**
Custom headers to include in the requests.
     */
  headers?: Record<string, string>;

  /**
Custom fetch implementation. You can use it as a middleware to intercept requests,
or to provide a custom fetch implementation for e.g. testing.
    */
  fetch?: typeof fetch;

  generateId?: () => string;
}

/**
Create a CustomProvider AI provider instance.
 */
export function createCustomProvider(
  options: CustomProviderProviderSettings = {},
): CustomProviderProvider {
  const baseURL =
    withoutTrailingSlash(options.baseURL ?? options.baseUrl) ??
    'http://localhost:8011/v1';

  const getHeaders = () => ({
    Authorization: `Bearer ${loadApiKey({
      apiKey: options.apiKey,
      environmentVariableName: 'CUSTOM_PROVIDER_API_KEY',
      description: 'CustomProvider',
    })}`,
    ...options.headers,
  });

  const createChatModel = (
    modelId: CustomProviderChatModelId,
    settings: CustomProviderChatSettings = {},
  ) =>
    new CustomProviderChatLanguageModel(modelId, settings, {
      provider: 'CustomProvider.chat',
      baseURL,
      headers: getHeaders,
      generateId: options.generateId ?? generateId,
      fetch: options.fetch,
    });


  const provider = function (
    modelId: CustomProviderChatModelId,
    settings?: CustomProviderChatSettings,
  ) {
    if (new.target) {
      throw new Error(
        'The CustomProviderProvider model function cannot be called with the new keyword.',
      );
    }

    return createChatModel(modelId, settings);
  };

  provider.languageModel = createChatModel;
  provider.chat = createChatModel;


  return provider as CustomProviderProvider;
}

/**
Default CustomProvider provider instance.
 */
export const customprovider = createCustomProvider();
