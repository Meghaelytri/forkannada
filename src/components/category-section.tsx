import CategoryCard from "./category-card";


const categories = [
  "Grammar",
  "Essays",
  "Stories",
  "Worksheets",
  "Puzzles",
  "Phrases",
];


export default function CategorySection(){

  return (

    <section className="py-16 px-6">


      <div className="max-w-7xl mx-auto">


        <h2 className="text-4xl font-bold mb-8">
          Explore Learning Resources
        </h2>


        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">


          {
            categories.map((category)=>(

              <CategoryCard
                key={category}
                name={category}
              />

            ))
          }


        </div>


      </div>


    </section>

  );

}