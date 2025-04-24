function ErrorPage({ error }: { error: string }) {
  return (
    <div>
      <p>ErrorPage page: ${error}</p>
    </div>
  );
}
export default ErrorPage;
