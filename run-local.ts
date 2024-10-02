import { defaultHandler } from './src/index';

(async () => {
  const lambdaResponse = await defaultHandler({
    body: JSON.stringify({
      name: 'Jon Moore',
    }),
  });
  if (lambdaResponse.statusCode === 200) {
    console.log('Hello world processed successfully');
  } else {
    console.error('Error processing hello world');
    console.error('Response is: ', lambdaResponse);
  }
})();
