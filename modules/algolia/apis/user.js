
import fetch from "node-fetch"
import { unWrap, getErrorResponse } from "../../../utils/fetchUtils";
import { getHeaders } from "../../helpers";

export default function(algoliaConfig){
    const headers = getHeaders(algoliaConfig);
    
    return {
        create : async (payload) => {
            try {
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users`, {
                    headers,
                    method: "POST",
                    body: JSON.stringify(payload)
                }))
            } catch (error) {
                return getErrorResponse(error)
            }
        }
    }
}