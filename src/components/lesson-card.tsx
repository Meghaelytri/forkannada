import Link from "next/link";
import { Lesson } from "@/types/lesson";


type Props = {
  lesson: Lesson;
};


export default function LessonCard({
  lesson,
}: Props) {


  const image =
    lesson._embedded?.["wp:featuredmedia"]?.[0]?.source_url;



  const terms =
    lesson._embedded?.["wp:term"]?.flat() || [];



  const board =
    terms.find(
      (term)=> term.taxonomy === "board"
    )?.name;



  const grade =
    terms.find(
      (term)=> term.taxonomy === "grade"
    )?.name;



  const type =
    terms.find(
      (term)=> term.taxonomy === "lesson_type"
    )?.name;



return (

<Link

href={`/lesson/${lesson.slug}`}

className="block border rounded-xl overflow-hidden hover:shadow-lg transition"

>


{image && (

<img

src={image}

alt={lesson.title.rendered}

className="w-full h-48 object-cover"

/>

)}



<div className="p-6">


<h3

className="text-xl font-bold"

dangerouslySetInnerHTML={{
__html:lesson.title.rendered
}}

/>



<div className="flex gap-2 mt-4 flex-wrap">


{board && (

<span className="px-3 py-1 bg-gray-100 rounded">
{board}
</span>

)}



{grade && (

<span className="px-3 py-1 bg-gray-100 rounded">
{grade}
</span>

)}



{type && (

<span className="px-3 py-1 bg-gray-100 rounded">
{type}
</span>

)}


</div>



<span className="inline-block mt-5 px-4 py-2 bg-black text-white rounded">

Read Lesson

</span>


</div>


</Link>

);


}