import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

const reqs = 100;
const secs = 60;
// ratelimiter for reqs requests per secs seconds

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(reqs, `${secs} s`)
});

export default ratelimit;