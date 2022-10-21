import fetch from "node-fetch"
import {
  unWrap,
  getErrorResponse
} from "../../../utils/fetchUtils";
import {
  getHeaders
} from "../../helpers";

export default function (algoliaConfig) {
  const headers = getHeaders(algoliaConfig);

  return {
    async create(payload) {
      try {
        return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/posts`, {
          headers,
          method: "POST",
          body: JSON.stringify(payload)
        }))
      } catch (error) {
        return getErrorResponse(error)
      }
    },
    async update(payload) {
      try {
        return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/posts/${payload.postId}`, {
          headers,
          method: "PUT",
          body: JSON.stringify(payload)
        }))
      } catch (error) {
        return getErrorResponse(error)
      }
    }
  }
}
