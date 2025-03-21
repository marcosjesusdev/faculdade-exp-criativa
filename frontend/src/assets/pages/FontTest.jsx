export default function FontTest() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 space-y-4">
      <h1 className="text-4xl font-avenirBlack text-blue-700">Avenir Black</h1>
      <h2 className="text-3xl font-avenirBook text-gray-800">Avenir Book</h2>
      <h3 className="text-3xl font-graphikBold text-red-600">Graphik Bold</h3>
      <p className="text-xl font-georgiaBold text-gray-600">
        Testando Georgia Bold. Se estiver funcionando, esta fonte será diferente da padrão!
      </p>
    </div>
  );
}
