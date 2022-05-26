import Header from '../components/template/Header'
import Footer from '../components/template/Footer'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Alumni() {
  const [alumni, setAlumni] = useState([])

  useEffect(() => {
    axios
      .get('https://localhost:7111/api/students')
      .then((response) => response.data)
      .then((data) => {
        setAlumni(data)
      })
  }, [])

  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <Header />
      <div className="w-full h-full flex items-center justify-center">
        <table className="w-2/5 font-ibm-plex-mono table-auto border-solid border-4 border-black rounded-md">
          <tr>
            <th>ID</th>
            <th>Enrollment number</th>
            <th>Course</th>
          </tr>
          {alumni.map((a) => {
            return (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.enrollmentNumber}</td>
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
