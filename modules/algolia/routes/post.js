import {
  sendJson
} from "../../helpers"

export default (apis) => {
  return async function getPostRoute(req, res, next) {

    if (req.method == "POST" && req.url == "/create") {
      apis.posts.create(req.body);
      sendJson(req.body, res);
    }

    if (req.method == "POST" && req.url == "/update") {
      apis.posts.update(req.body);
      sendJson(req.body, res);
    }
  }
}
