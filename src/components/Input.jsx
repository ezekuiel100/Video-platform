function Input({ type, name, placeholder }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required
      className='border border-gray-200 rounded-lg outline-none p-3 text-sm focus:drop-shadow-md'
    ></input>
  );
}

export default Input;
