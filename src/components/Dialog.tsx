import "./Dialog.css";

function Dialog({ title }: { title: string }) {
  return (
    <div className="Dialog scrim">
      <div className="box">
        <h1 className="underline">Title</h1>
        <p>Testing 123</p>
      </div>
    </div>
  );
}

export default Dialog;
