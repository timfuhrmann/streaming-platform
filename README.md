A video streaming demo platform built with Next.js, inspired by Netflix, using a custom video player and providing a streaming example following the HLS protocol.

Check it out to explore all features: https://tmdb-streaming-platform.vercel.app/

## Frontend
- Next.js
- Typescript
- Styled Components
- Redux
- Hls.js

## API
The following api is being utilized: https://developers.themoviedb.org/3/getting-started/introduction

## Next.js
### Middleware & Edge Functions
Whether or not a profile has been selected is being checked on the edge at the speed of static to handle a possible redirect.

### Serverless Functions
Serverless Functions handle the profile selection itself and the validation of possible profile codes/passwords.

### Static Site Generation
Overview page is being statically generated and revalidated every hour.

### Clientside
1. Prefetch on hover using redux async thunk
2. Open popup respective tv show within popup on click
3. Get state if available from prefetch, if not, wait for updated state

![Preview](public/preview-popup.png)

## HTTP Live Streaming
HTTP Live Streaming is an HTTP-based adaptive bitrate streaming communications protocol. It resembles MPEG-DASH in that it works by breaking the overall stream into a sequence of small HTTP-based file downloads, each downloading one short chunk of an overall potentially unbounded transport stream. A list of available streams, encoded at different bit rates, is sent to the client using an extended M3U playlist. [Read more.](https://en.wikipedia.org/wiki/HTTP_Live_Streaming)

## Custom Media Player
The application uses its own custom media player. Because of missing resources audio and subtitle selection are not included.

![Media Player](public/preview-player.png)

## Getting Started

Make sure to copy paste the `.env.public` contents to your local dotenv file and fill in the missing fields.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
