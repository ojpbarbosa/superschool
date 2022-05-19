import { v4 as uuid } from 'uuid'
import Header from '../components/template/Header'
import Footer from '../components/template/Footer'

export default function Alumni() {
  const alumni = Array.from(Array(10), () => {
    return {
      id: uuid(),
      en: Math.round(Math.random() * (30000 - 20000)) + 20000,
      course: Math.round(Math.random() * (100 - 1)) + 1
    }
  })

  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <Header />
      <div className="w-full h-full flex items-center justify-center">
        <table className="w-2/5 font-ibm-plex-mono table-auto border-8 border-black rounded-md">
          <tr>
            <th>ID</th>
            <th>Enrollment number</th>
            <th>Course</th>
          </tr>
          {alumni.map((a) => {
            return (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.en}</td>
                <td>{a.course}</td>
              </tr>
            )
          })}
        </table>
      </div>
      <Footer />
    </div>
  )
}
