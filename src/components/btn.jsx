export default function Button({ children, handleClick, ...props }) {
  return (
    <button {...props} onClick={handleClick}>
      {children}
    </button>
  );
}
