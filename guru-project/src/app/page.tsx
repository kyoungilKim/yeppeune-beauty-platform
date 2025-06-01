export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">안녕하세요!</span>
              <span className="block text-blue-600">웹 개발자입니다</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              창의적이고 효율적인 웹 솔루션을 제공하는 개발자입니다.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">About Me</h2>
            <p className="mt-4 text-lg text-gray-500">
              웹 개발에 대한 열정을 가지고 있으며, 새로운 기술을 배우는 것을 즐깁니다.
              사용자 경험을 중요시하며, 깔끔하고 효율적인 코드 작성을 지향합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">Projects</h2>
          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Project Card 1 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">프로젝트 1</h3>
                <p className="mt-2 text-gray-500">프로젝트에 대한 간단한 설명을 작성하세요.</p>
                <div className="mt-4 flex gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Node.js</span>
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">프로젝트 2</h3>
                <p className="mt-2 text-gray-500">프로젝트에 대한 간단한 설명을 작성하세요.</p>
                <div className="mt-4 flex gap-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Next.js</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">TypeScript</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">Skills</h2>
          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900">Frontend</h3>
              <ul className="mt-4 space-y-2">
                <li className="text-gray-500">React</li>
                <li className="text-gray-500">Next.js</li>
                <li className="text-gray-500">TypeScript</li>
                <li className="text-gray-500">Tailwind CSS</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900">Backend</h3>
              <ul className="mt-4 space-y-2">
                <li className="text-gray-500">Node.js</li>
                <li className="text-gray-500">Express</li>
                <li className="text-gray-500">Python</li>
                <li className="text-gray-500">MySQL</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Contact</h2>
            <div className="mt-8 flex justify-center space-x-6">
              <a href="mailto:saintpapa7@gmail.com" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">Email</span>
                📧 your.email@example.com
              </a>
              <a href="https://github.com/Guruhouse" className="text-gray-500 hover:text-gray-900" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">GitHub</span>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
