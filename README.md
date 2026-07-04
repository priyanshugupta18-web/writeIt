# WriteIt

WriteIt is a modern full-stack blogging platform built to provide a
seamless writing and publishing experience. It enables users to securely
create, edit, publish, and manage rich-text blog posts through a
responsive and intuitive interface.

## Features

-   Secure user authentication with Appwrite
-   Protected routes for authenticated users
-   Rich-text editing powered by TinyMCE
-   Image upload and management
-   Create, edit, and delete blog posts
-   Responsive UI built with Tailwind CSS
-   Smooth animations using Motion
-   Centralized state management with Redux Toolkit
-   Fast development and optimized builds with Vite

## Tech Stack

### Frontend

-   React
-   Redux Toolkit
-   React Router
-   Tailwind CSS
-   Motion
-   TinyMCE
-   Vite

### Backend & Services

-   Appwrite Authentication
-   Appwrite Database
-   Appwrite Storage

## Project Structure

``` text
src/
├── appwrite/
├── components/
├── pages/
├── store/
├── config/
├── routes/
└── assets/
```

## What I Learned

Developing WriteIt strengthened my understanding of:

-   Component-based architecture in React
-   Global state management with Redux Toolkit
-   Authentication and authorization
-   Protected routing
-   API integration and asynchronous data handling
-   Rich-text editor integration
-   File upload workflows
-   Responsive UI design
-   Performance optimization
-   Modern frontend development practices

## Challenges

-   Managing asynchronous rendering while fetching data
-   Synchronizing editor state with application state
-   Handling image replacement and cleanup
-   Preventing unauthorized access to protected pages
-   Maintaining consistent UI across different screen sizes
-   Organizing scalable project architecture

## Installation

``` bash
git clone <repository-url>
cd writeit
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the project root.

``` env
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
VITE_APPWRITE_BUCKET_ID=
VITE_TINYMCE_API_KEY=
```

## Future Improvements

-   Categories and tags
-   Search and filtering
-   Bookmarks
-   Draft support
-   Reading time estimation
-   User profiles
-   Dark/Light theme toggle
-   Markdown export
-   Social sharing

## Author

**Priyanshu Gupta**

Computer Science Undergraduate \| Full-Stack Web Developer

------------------------------------------------------------------------

If you found this project interesting, consider giving it a star on
GitHub.
