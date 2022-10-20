import userApi from "./user"

export default function(algoliaConfig){
    return {
        user : userApi(algoliaConfig)
    }
}
