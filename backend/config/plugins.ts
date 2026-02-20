export default ({ env }) => ({
  upload: {
    config: {
      provider: "strapi-provider-cloudflare-r2",
      providerOptions: {
        accessKeyId: env("CF_ACCESS_KEY_ID"),
        secretAccessKey: env("CF_ACCESS_SECRET"),
        /**
         * `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`
         */
        endpoint: env("CF_ENDPOINT"),
        params: {
          Bucket: env("CF_BUCKET"),
        },
        cloudflarePublicAccessUrl: env("CF_PUBLIC_ACCESS_URL"),
        pool: false,
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  "cloudflare-deploy": {
    enabled: true,
    config: {
      accountId: env("CF_ACCOUNT_ID"),
      apiToken: env("CF_API_TOKEN"),
      instances: [
        {
          name: "annieehler-portfolio-site",
          type: "worker",
          triggerUuid: "283ec7b4-cc22-49fb-8b62-568f04485555",
          branch: "main",
        },
      ],
    },
  },
});
