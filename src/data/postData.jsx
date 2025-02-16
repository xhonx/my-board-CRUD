export const BoardPost = [
  {
    // ----- Free -----
    BoardIndex: "Free", // url이랑 비교함. 게시판 url 이랑 같아야됨.
    //title: "# Free",

    // posts 배열 !! 각 게시판 별 실제 테이블에 보여야되는 데이터
    posts: [
      {
        id: 1, // 게시글 순서 번호
        title: "This is the first post", // 제목
        content: "dkdlskdkdkdkdk내용내용", //글 내용
        time: "2025-02-12", // 게시글 올린 시간
        user: "hannah",
      }, // --> { }이거 하나가 객체(게시글 객체)임.
      {
        id: 2,
        title: "This is the second post",
        content: "dkdlskdkdkdkdk내용내용",
        time: "2025-02-13",
        user: "Tom",
      },
      {
        id: 3,
        title: "This is the third post",
        content: "dkdlskdkdkdkdk내용내용",
        time: "2025-02-15",
        user: "Matt",
      },
    ],
  },
  {
    // ----- HN -----
    BoardIndex: "HN",
    //title: "# HN",
    posts: [
      {
        id: 1,
        title: "This is the first post",
        content: "dkdlskdkdkdkdk내용내용",
        time: "2025-02-12",
        user: "Chris",
      },
      {
        id: 2,
        title: "This is the second post",
        content: "dkdlskdkdkdkdk내용내용",
        time: "2025-02-13",
        user: "Nick",
      },
    ],
  },
  {
    // ----- Front -----
    BoardIndex: "Front",
    //title: "# Front",
    posts: [
      {
        id: 1,
        title: "This is the first post",
        content: "dkdlskdkdkdkdk내용내용",
        time: "2024-11-19",
        user: "hhh",
      },
      {
        id: 2,
        title: "This is the second post",
        content: "dkdlskdkdkdkdk내용내용",
        time: "2025-02-13",
        user: "justin",
      },
    ],
  },
  {
    // ----- Back -----
    BoardIndex: "Back",
    //title: "# Back",
    posts: [
      {
        id: 1,
        title: "This is the first post",
        content: "dkdlskdkdkdkdk내용내용",
        time: "2025-02-12",
        user: "Chris",
      },
      {
        id: 2,
        title: "This is the second post",
        content: "dkdlskdkdkdkdk내용내용",
        time: "2025-01-13",
        user: "Nick",
      },
      {
        id: 3,
        title: "This is the second post",
        content: "dkdlskdkdkdkdk내용내용",
        time: "2025-02-13",
        user: "Nick",
      },
      {
        id: 4,
        title: "hihi ~!!",
        content: "dkdlskdkdkdkdk내용내용",
        time: "2025-02-02",
        user: "Nick",
      },
    ],
  },
];
