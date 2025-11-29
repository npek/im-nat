import SimpleText from "./SimpleText";

type BulletPointProps = {
  children: React.ReactNode;
};

const BulletPoint = ({ children }: BulletPointProps) => {
  return (
    <div className="flex flex-row space-x-8">
      <label>*</label>
      <SimpleText>{children}</SimpleText>
    </div>
  );
};

export default BulletPoint;
