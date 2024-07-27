# Vercel AI SDK - Custom Provider

This is an implementation attempt of the vercel custom provider SDK for the [Vercel AI SDK](https://sdk.vercel.ai/docs) contains language model support for a given open source LLM server backend

```ts
import { customprovider } from '@ai-sdk/custom-provider';
```

## Example

```ts
import { customprovider } from '@ai-sdk/custom-provider';
import { generateText } from 'ai';

const { text } = await generateText({
  model: customprovider('custom-model-small'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

