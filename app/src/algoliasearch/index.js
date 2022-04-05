import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch('W25I3XQJCT', '846e461288dfcc5978792ef1a59468b0');

export const threadsIndex = client.initIndex('threads');
