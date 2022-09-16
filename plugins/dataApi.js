export default function({ $config }, inject){

  const headers = {
      'X-Algolia-API-Key': $config.algolia.key,
      'X-Algolia-Application-Id': $config.algolia.appId
  }

  inject('dataApi', {
      getPosts
  })

  async function getPosts(){
      try{
          let response = await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/posts/query`,
          {
              headers,
              method : "POST",
              body: JSON.stringify({
                  attributesToHighlight: []
              })
          })

          let json = await response.json();

          return json;
      }catch(error){
          console.error(error)
      }
  }

}
