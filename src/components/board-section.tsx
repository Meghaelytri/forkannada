import BoardCard from "./board-card";


const boards = [
  {
    name: "State",
    description:
      "Karnataka State syllabus Kannada learning"
  },

  {
    name: "CBSE",
    description:
      "CBSE Kannada lessons and resources"
  },

  {
    name: "ICSE",
    description:
      "ICSE Kannada learning materials"
  },
];


export default function BoardSection(){

return (

<section className="py-16 px-6">

<div className="max-w-7xl mx-auto">


<h2 className="text-4xl font-bold mb-8">
Choose Your Syllabus
</h2>


<div className="grid md:grid-cols-3 gap-6">


{
boards.map((board)=>(
  
<BoardCard

key={board.name}

name={board.name}

description={board.description}

/>

))

}


</div>


</div>

</section>

)

}