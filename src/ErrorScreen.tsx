function ErrorScreen({ err }: { err: string }) {
  return (
    <div className="err-box">
      <h1 className="err-text">Something went wrong - {err}</h1>
    </div>
  );
}

export default ErrorScreen;
