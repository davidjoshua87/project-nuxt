import userApi from "./user"
import postApi from "./post"
export default function(algoliaConfig){
    return {
        user : userApi(algoliaConfig),
        posts: postApi(algoliaConfig)
    }
}
