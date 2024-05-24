This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Libraries Used
## Axios
axios is a promise-based HTTP client for JavaScript, often used in both browser and Node.js environments. It simplifies making HTTP requests, such as GET, POST, PUT, DELETE, etc., and handling responses. Here are some key features:

Promise-based: Uses Promises to handle asynchronous operations, making it easier to work with asynchronous code.
Requests and responses: Simplifies making requests and handling responses, including automatic transformation of JSON data.
Error handling: Provides better error handling compared to the native fetch API.
Interceptors: Allows you to intercept requests or responses before they are handled, useful for adding headers, logging, or modifying request data.

## Cheerios
cheerio is a fast, flexible, and lean implementation of core jQuery designed specifically for the server. It is commonly used for web scraping, allowing you to parse and manipulate HTML and XML in a jQuery-like syntax. Cheerio is often used to extract data from HTML documents after fetching them using an HTTP client like axios.

Key features of cheerio:

DOM Manipulation: Enables manipulation of DOM elements with a syntax similar to jQuery.
HTML Parsing: Parses HTML and XML documents, allowing you to traverse and extract elements.
Lightweight: Designed for server-side operations, without the overhead of a full browser environment.
