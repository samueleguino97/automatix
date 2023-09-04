const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cnwclrnehgdqirzyfsfp.supabase.co"],
  },
};
module.exports = nextConfig;
