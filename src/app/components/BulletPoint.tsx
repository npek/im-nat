type BulletPointProps = {
  children: React.ReactNode;
};

const BulletPoint = ({ children }: BulletPointProps) => {
  return (
    <div className="flex flex-row text-xl text-nat-pink space-x-8">
      <label>*</label>
      <label>{children}</label>
    </div>
  );
};

export default BulletPoint;
