import { useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query'

// Initialize a new instance of QueryClient, which will manage the caching and fetching of queries.
const queryClient = new QueryClient()

// Asynchronous function to fetch data from the given API endpoint.
async function getter() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts/"); // Fetch data from the API.
  const response = await data.json(); // Parse the response as JSON.
  return response; // Return the parsed JSON data.
}

// Main App component that provides the QueryClient to the rest of the app.
function App() {
  return (
    // Provide the QueryClient instance to all components wrapped within this provider.
    <QueryClientProvider client={queryClient}>
      <Posts /> {/* Render the Posts component */}
    </QueryClientProvider>
  )
}

// Posts component to display the data fetched from the API.
function Posts() {
  const queryClient = useQueryClient() // Access the QueryClient instance to manually invalidate or refetch queries if needed.
  
  // useQuery hook is used to fetch and cache data. It accepts:
  // - `queryKey`: A unique key to identify this query.
  // - `queryFn`: The function that fetches the data.
  const { data, isLoading, error } = useQuery({ queryKey: ['posts'], queryFn: getter })

  // If there is an error while fetching data, render an error message.
  if (error) {
    return (
      <div>
        "Error while fetching posts"
      </div>
    )
  }

  // While the data is being loaded, render a loading message.
  if (isLoading) {
    return (
      <div>"Loading..."</div>
    )
  }

  // Once the data is successfully fetched, display it as a JSON string.
  return (
    <div>
      {JSON.stringify(data)} {/* Convert the fetched data to a JSON string and display it */}
    </div>
  )
}

export default App // Export the App component as the default export.
