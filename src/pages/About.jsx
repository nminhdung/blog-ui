
const About = () => {
  return (
    <div className='w-[700px] mx-auto p-4 flex flex-col justify-center my-[100px]'>
      <h1 className='text-3xl md:text-4xl uppercase'>
        About my blog
      </h1>
      <div className='text-md text-gray-500 flex flex-col gap-6 my-8'>
        <p>
          Chào mừng đến blog của mình ! Đây blog được tạo ra như một dự án
          cá nhân với sở thích chia sẻ những kiến thức hữu và thú vị công nghệ, đời sống.
          Mình là một developer thích tìm hiểu nhiều công nghệ mới , code
        </p>

        <p>
          Trong blog này, các bạn có thể tìm được những bài viết hướng dẫn về các chủ đề
          như phát triển web, công nghệ thông tin, ngôn ngữ lập trình
        </p>

        <p>
          Không liên quan nhưng mình muốn giới thiệu tới các bạn về một quyển sách mình rất thích
          Đó là Power Of Now (Sức mạnh của hiện tại). Cuốn sách có thể giúp chúng ta nhận biết chúng ta là gì.
          Và hãy đọc sách để thấy vẻ đẹp của bản thân.
        </p>
      </div>
    </div>
  );
};

export default About;