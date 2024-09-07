function ProfileImage({ onToggle, user }) {
  return (
    <img
      src={user.profileImage}
      onClick={onToggle}
      className={`h-7 w-7 rounded-full cursor-pointer `}
    />
  );
}

export default ProfileImage;
