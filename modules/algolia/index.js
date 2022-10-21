import userRouter from "./routes/user";
import postRouter from "./routes/post";
import getApis from "./apis"
import bodyParser from "body-parser"

export default function () {
  const algoliaConfig = this.options.privateRuntimeConfig.algolia;
  const apis = getApis(algoliaConfig);
  const authKey = this.options.publicRuntimeConfig.auth

  this.nuxt.hook("render:setupMiddleware", app => {
    app.use(bodyParser.json());
    app.use("/api/user", userRouter(apis, authKey));
    app.use("/api/posts", postRouter(apis, authKey))
  })
}
