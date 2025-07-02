function Input({ type, name, placeholder }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required
      className='text-black border border-gray-200 rounded-lg outline-none p-3 text-lg focus:drop-shadow-md'
    ></input>
  );
}

export default Input;
