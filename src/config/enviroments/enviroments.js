import "dotenv/config";

import env from "env-var";

const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    DB_URL: env.get("DB_URL").required().asString()
}

export default envs