function ProfileImage({ onToggle }) {
  return (
    <img
      onClick={onToggle}
      src='./src/image/profile.jpg'
      className={`h-7 w-7 rounded-full cursor-pointer `}
    />
  );
}

export default ProfileImage;
