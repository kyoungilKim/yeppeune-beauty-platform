export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          나만의 첫 번째 웹 앱
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          컴퓨터 왕초보가 만든 첫 번째 프로젝트 🎉
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/analysis"
            className="rounded-md bg-rose-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
          >
            시작하기
          </a>
          <a
            href="/about"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            더 알아보기 <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
