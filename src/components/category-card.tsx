type CategoryCardProps = {
  name: string;
};


export default function CategoryCard({
  name,
}: CategoryCardProps) {

  return (

    <div className="border rounded-xl p-6 text-center hover:shadow-lg cursor-pointer transition">

      <h3 className="text-xl font-bold">
        {name}
      </h3>

    </div>

  );

}