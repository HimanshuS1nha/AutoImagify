const Title = ({ title, text }: { title: string; text: string }) => {
  return (
    <div className="flex flex-col gap-y-5 items-center">
      <div className="flex flex-col gap-y-2 items-center">
        <p className="text-5xl font-bold">{title}</p>
        <div className="w-20 h-1 bg-blue-600" />
      </div>
      <p className="text-gray-700 text-sm text-center">{text}</p>
    </div>
  );
};

export default Title;
