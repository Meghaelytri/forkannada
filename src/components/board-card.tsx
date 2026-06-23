import Link from "next/link";


type Props = {
  id: number;
  name: string;
  description: string;
};


export default function BoardCard({
  id,
  name,
  description,
}: Props) {


return (

<Link

href={`/lessons?board=${id}`}

className="block border rounded-xl p-6 hover:shadow-lg transition"

>


<h3 className="text-2xl font-bold mb-2">
{name}
</h3>


<p className="text-gray-600">
{description}
</p>


</Link>

);

}