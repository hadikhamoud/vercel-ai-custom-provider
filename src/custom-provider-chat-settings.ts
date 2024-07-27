export type CustomProviderChatModelId =
  | 'customprovider-model-small'
  | 'customprovider-model-large'
  | (string & {});

export interface CustomProviderChatSettings {
  /**
Whether to inject a safety prompt before all conversations.

Defaults to `false`.
   */
  safePrompt?: boolean;
}
