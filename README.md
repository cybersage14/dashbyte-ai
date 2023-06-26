# Dashbyte
Dashbyte is a comprehensive web application that provides a variety of services, including software development, PC building, IT services, and website design. The application uses a robust tech stack: React and Next.js for the front-end, Redux for state management, MongoDB for the database, and Tailwind CSS for the design framework.

# Features
Home Page: The home page continues to feature a full-scale chat interface where users can interact with an AI model. The chat interface has been migrated to Next.js and Redux for better performance and scalability, with Tailwind CSS providing a refreshed and responsive user interface.

## Services Page: The services page, reimagined with Tailwind CSS, provides information about the various services offered by Dashbyte. Each service is now presented with a more modern card-like format for easy reading.

## Chat Interface: The chat interface is available on all pages of the application. On the home page, the chat interface is full-scale, while on other pages, it appears as a small, floating chat box. The chat interface maintains message and context consistency across all pages, now powered by Redux state management for a more seamless user experience.

## AI Integration: The chat interface connects to OpenAI's GPT-3 model to provide intelligent and interactive responses to user inputs. The AI integration is handled on the server-side, with the client-side code making POST requests to the server to process user inputs.

## MongoDB Integration: The application now uses MongoDB for its database, allowing for robust data management and scalability. Mongoose is used for object data modeling and provides a straightforward, schema-based solution to model the application data.

# Goals
The primary goal of Dashbyte remains the same: to provide a seamless and interactive user experience. The chat interface, now enhanced with Next.js and Redux, is designed to be more intuitive and engaging, with the AI providing intelligent responses to user inputs. The application aims to maintain a consistent chat context across all pages, allowing users to continue their conversation with the AI as they navigate through the site.

# Future Improvements
Future improvements to Dashbyte may include further refining the chat interface, expanding the range of services offered, and leveraging more advanced features of the tech stack. The application may also benefit from additional AI integrations, such as more advanced natural language processing capabilities.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Running the server 

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
