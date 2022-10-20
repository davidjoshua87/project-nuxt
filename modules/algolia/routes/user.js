import {
  sendJson
} from "../../helpers";

export default function (apis, authKey) {
  return async function getUSerRoute(req, res, next) {
    if (req.method == "POST" && req.url == "/register") {
      apis.user.create(req.body)
      sendJson(req.body, res)
    }
    if (req.method == "POST" && req.url == "/login") {
      const user = await apis.user.getAuthUser(req.body);
      res.end(JSON.stringify({
        user: user.json.hits
      }))
    }
    next();
  }
}
