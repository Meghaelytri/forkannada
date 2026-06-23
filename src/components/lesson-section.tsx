import { getLessons } from "@/lib/wordpress";
import LessonCard from "./lesson-card";
import { Lesson } from "@/types/lesson";


export default async function LessonSection(){


const lessons:Lesson[] = await getLessons();



return (

<section className="py-16 px-6">


<div className="max-w-7xl mx-auto">


<h2 className="text-4xl font-bold mb-8">
Latest Lessons
</h2>


<div className="grid md:grid-cols-3 gap-6">


{
lessons.map((lesson)=>(

<LessonCard
key={lesson.id}
lesson={lesson}
/>

))
}


</div>


</div>


</section>

);


}