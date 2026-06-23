type GradeCardProps = {
  grade: string;
};


export default function GradeCard({
  grade,
}: GradeCardProps) {

  return (

    <div className="border rounded-xl p-6 text-center hover:shadow-lg cursor-pointer transition">

      <h3 className="text-2xl font-bold">
        {grade}
      </h3>

    </div>

  );

}