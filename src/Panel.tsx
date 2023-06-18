type PanelProps = {
  title: string;
  children: string;
  setEditing: React.Dispatch<React.SetStateAction<string>>;
  setCode: React.Dispatch<React.SetStateAction<string>>;
};


const Panel = ({ title, children, setEditing, setCode }: PanelProps) => {
  return (
    <div className="w-[50vw] h-full bg-gray-900">
      <h2 className="text-white text-2xl font-bold m-4">{title} Code</h2>
      <textarea
        onFocus={() => setEditing(title)}
        onChange={(e) => setCode(e.target.value)}
        value={children}
        className="bg-inherit m-4 p-2 border-2 border-gray-600 rounded-md flex w-[49vw] h-[91vh] relative"
      >
      </textarea>
    </div>
  );
};

export default Panel;
