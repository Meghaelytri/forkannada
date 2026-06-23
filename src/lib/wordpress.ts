const API_URL = "http://forkannada.local/wp-json/wp/v2";


// Get all lessons
export async function getLessons() {

  const response = await fetch(
    `${API_URL}/lesson?_embed`,
    {
      cache: "no-store",
    }
  );


  if (!response.ok) {

    throw new Error("Failed to fetch lessons");

  }


  return response.json();

}



// Get single lesson by slug
export async function getLessonBySlug(slug: string) {

  const response = await fetch(

    `${API_URL}/lesson?slug=${slug}&_embed`,

    {
      cache: "no-store",
    }

  );


  if (!response.ok) {

    throw new Error("Failed to fetch lesson");

  }


  const lessons = await response.json();



  if (!lessons.length) {

    return null;

  }



  return lessons[0];

}



// Get boards (State, CBSE, ICSE)
export async function getBoards() {

  const response = await fetch(

    `${API_URL}/board`,

    {
      cache: "no-store",
    }

  );


  if (!response.ok) {

    throw new Error("Failed to fetch boards");

  }


  return response.json();

}



// Get grades (Class 1 - Class 12)
export async function getGrades() {

  const response = await fetch(

    `${API_URL}/grade`,

    {
      cache: "no-store",
    }

  );


  if (!response.ok) {

    throw new Error("Failed to fetch grades");

  }


  return response.json();

}



// Get lesson types (Grammar, Story, Worksheet...)
export async function getLessonTypes() {

  const response = await fetch(

    `${API_URL}/lesson_type`,

    {
      cache: "no-store",
    }

  );


  if (!response.ok) {

    throw new Error("Failed to fetch lesson types");

  }


  return response.json();

}

export async function getLessonsByFilter(
  board?: number,
  grade?: number,
  type?: number
){

let url = `${API_URL}/lesson?_embed`;


if(board){

url += `&board=${board}`;

}


if(grade){

url += `&grade=${grade}`;

}


if(type){

url += `&lesson_type=${type}`;

}



const response = await fetch(

url,

{
cache:"no-store"
}

);



if(!response.ok){

throw new Error(
"Failed to fetch filtered lessons"
);

}



return response.json();

}