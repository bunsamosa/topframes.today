# FrameCaster

FrameCaster is an interactive client that lets the user discover the top frames available on Farcaster ecosystem. A user can look at global ranking or login to view frames that are curated based on their interest and followers.

## How it works
- Recommendations and rankings obtained from Karma3Labs API
    - Fetch the top frames and user specific frames - [Code](src\routes\api\top-frames\\+server.ts)
    - Home-page renders a list of frames - [Component](src\lib\components\FrameList.svelte)
    - User ranking and recommendations - [Component](src\routes\api\user-ranking\\+server.ts)

- Each frame is built by reading the meta properties from `<head>` tag
    - Read metadata in the HTML source - [Code](src\routes\api\frame-data\\+server.ts)
    - Extract buttons and build the frame - [Code](src\lib\scripts\FrameClient.ts), [Component](src\lib\components\Frame.svelte)

- User authentication with Farcaster vanilla JS client
