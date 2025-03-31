"use client";


const ErrorPage = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const message = queryParams.get("message");
  const code = queryParams.get("code");

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Something went wrong</h1>
      <p>Error Code: {code || "Unknown"}</p>
      <p>{message || "An unexpected error occurred."}</p>
    </div>
  );
};

export default ErrorPage;
