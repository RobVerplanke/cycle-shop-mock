export default function ProductCategory({ type }: { type: string }) {
  const category = type === 'bike' ? 'Bicycle' : 'Accessory';

  return <div className="">{category}</div>;
}
