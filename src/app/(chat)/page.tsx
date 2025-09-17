import React from 'react';

const page = () => {
  return (
    <main className="flex-1 p-6">
      <div className="mx-auto max-w-4xl">
        {/* <h1 className="mb-4 text-2xl font-semibold">Welcome to Claude</h1> */}
        <p className="text-muted-foreground">
          Your AI assistant is ready to help. Use the sidebar to navigate between chats, projects,
          and artifacts.
        </p>
      </div>
    </main>
  );
};

export default page;
