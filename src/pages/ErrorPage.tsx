function ErrorPage({ error }: { error: string }) {
  return (
    <div>
      <p>{error}</p>
    </div>
  );
}
export default ErrorPage;
