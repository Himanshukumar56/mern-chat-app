const Conversation = () => {
  return (
    <>
      <div className="flex-gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src="https://avatar.iran.liara.run/public/boy"
              alt="user avatar"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversation;
