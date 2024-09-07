function VideoForm({ title, setTitle }) {
  return (
    <form className='w-full'>
      <div className='w-full'>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          name='title'
          required
          value={title}
          className='w-full p-2 rounded-lg outline-none'
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </form>
  );
}

export default VideoForm;
