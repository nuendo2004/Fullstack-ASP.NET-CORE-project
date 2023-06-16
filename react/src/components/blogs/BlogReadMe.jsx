import React from "react";
import BlogArticle from "./BlogArticle";

export default function ReadMeBlogs() {
  const blogData = {
    id: 68,
    title: "Evacuation Patterns in High Rise Buildings",
    subject: "Civil Engineering",
    content: `<p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Facilisi cras
          fermentum odio eu. Augue interdum velit euismod in pellentesque massa
          placerat duis ultricies.
        </p>`,
    isPublished: false,
    imageUrl:
      "https://www.engserv.com.au/wp-content/uploads/2019/03/civil-engineering.jpg",
    dateCreated: "Created: 2022-08-11",
    dateModified: "Modified: 2022-08-11",
    datePublish: "Published: 2022-08-10",
    blogType: {
      id: 1,
      name: "General",
    },
    author: {
      id: 135,
      userId: 135,
      firstName: "Dave",
      lastName: "Johnson",
      mi: "T",
      avatarUrl: "https://bit.ly/3PgKxrQ",
    },
  };

  return (
    <>
      <BlogArticle blog={blogData}></BlogArticle>
    </>
  );
}
