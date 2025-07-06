// Reformat the category text that is displayed on the details page
export default function ProductCategory({ type }: { type: string }) {
  const category = type === 'bike' ? 'Bicycle' : 'Accessory';

  return <div className="">{category}</div>;
}
