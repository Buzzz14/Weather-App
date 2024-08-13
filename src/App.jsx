import WeatherApp from "./WeatherApp"

function App() {
  return (
    <>
      <header>
        <nav className="p-8 bg-n-blue text-l-gray">
          <h2 className="text-3xl font-medium text-center">Weather App</h2>
        </nav>
      </header>
      <WeatherApp/>
      <footer className="p-8 bg-n-blue text-l-gray">
        <p className="text-center">&copy; 2024 Weather App </p>
      </footer>
    </>
  )
}
export default App
