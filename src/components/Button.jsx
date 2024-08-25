function Button({ children }) {
  return (
    <button className='bg-blue-600 p-3 text-white rounded-md hover:bg-blue-500 transition-all'>
      {children}
    </button>
  );
}

export default Button;
