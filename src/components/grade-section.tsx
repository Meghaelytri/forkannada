import GradeCard from "./grade-card";


const grades = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];


export default function GradeSection(){

  return (

    <section className="py-16 px-6">


      <div className="max-w-7xl mx-auto">


        <h2 className="text-4xl font-bold mb-8">
          Choose Your Class
        </h2>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">


          {
            grades.map((grade)=>(

              <GradeCard
                key={grade}
                grade={grade}
              />

            ))
          }


        </div>


      </div>


    </section>

  );

}