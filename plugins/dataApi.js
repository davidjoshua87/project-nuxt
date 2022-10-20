import { getErrorResponse, unWrap } from "../utils/fetchUtils";
export default function({ $config, store }, inject){

    const headers = {
        'X-Algolia-API-Key': $config.algolia.key,
        'X-Algolia-Application-Id': $config.algolia.appId
    }

    inject('dataApi', {
        getPosts,
        getUserById,
        getPostsById
    })

    async function getPosts(){
        try{
          let response = await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/posts/query`,
            {
              headers,
              method: "POST",
              body: JSON.stringify({
                attributesToHighlight: []
              })
            });

          let json = await response.json();

          return json;
        }catch(error){
          console.error(error)
        }
    }

    async function getUserById(userId){
        try {
          const result = await unWrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/users/query`, {
            headers,
            method: "POST",
            body: JSON.stringify({
              filters: `userId:${userId}`,
              attributesToHighlight: []
            })
          }));

          if(result.json.hits.length > 0){
            store.dispatch("auth/user", result.json.hits[0])
          };

          return result;
        } catch (error) {
          return getErrorResponse(error)
        }
    }

    async function getPostsById(userId){
        try {
          const result = await unWrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/posts/query`, {
            headers,
            method: "POST",
            body: JSON.stringify({
              filters: `userId:${userId}`,
              attributesToHighlight: []
            })
          }));

          if(result.json.hits.length > 0){
            store.dispatch("auth/user", result.json.hits[0])
          };

          return result;
        } catch (error) {
          return getErrorResponse(error)
        }
    }
}
