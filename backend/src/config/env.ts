import 'dotenv/config';
import * as env from 'env-var';

export const config = {
    PORT: env.get('PORT').default(5000).asPortNumber(),
    MONGO_URL: env.get('MONGO_URL').required().asString(),
    JWT_SECRET: env.get('JWT_SECRET').required().asString(),
    MONGO_USER: env.get('MONGO_USER').required().asString(),
    MONGO_PASS: env.get('MONGO_PASS').required().asString(),
    MONGO_DB: env.get('MONGO_DB').required().asString(),
    AD_CLICK_TIMEOUT_SECONDS: env.get('AD_CLICK_TIMEOUT_SECONDS').default(30).asIntPositive()
}
