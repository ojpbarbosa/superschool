import Header from '../components/template/Header'
import Footer from '../components/template/Footer'
import axios from 'axios'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { v4 as uuid } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPaperPlane,
  faBan,
  faMarker,
  faTrash
} from '@fortawesome/free-solid-svg-icons'

const initialState = {
  courses: [],
  newCourse: { id: '', name: '', code: 0 }
}

export default function Courses() {
  const [courses, setCourses] = useState(initialState.courses)
  const [newCourse, setNewCourse] = useState(initialState.newCourse)

  useEffect(() => {
    axios
      .get('https://localhost:7111/api/courses')
      .then((response) => response.data)
      .then((data) => {
        setCourses(data)
      })
  }, [])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setNewCourse({
      ...newCourse,
      [name]: value
    })
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const { id } = newCourse

    const method = id ? 'put' : 'post'
    const url = `https://localhost:7111/api/courses/${
      method === 'put' ? id : ''
    }`

    if (!id) {
      newCourse.id = uuid()
    } else {
      delete newCourse.id
    }

    axios[method](url, newCourse)
      .then((response) => response.data)
      .then((data) => {
        setCourses(getUpdatedCourses(data))

        setNewCourse(initialState.newCourse)
      })
  }

  function getUpdatedCourses(
    newCourse: typeof initialState.newCourse,
    exclude?: boolean
  ) {
    const updatedCourses = courses.filter((c) => c.id !== newCourse.id)

    if (!exclude) {
      updatedCourses.unshift(newCourse)
    }

    return updatedCourses
  }

  function handleCancel() {
    setNewCourse(initialState.newCourse)
  }

  function handleUpdate(updatedCourse: typeof initialState.newCourse) {
    setNewCourse(updatedCourse)
  }

  function handleDelete(deletedCourse: typeof initialState.newCourse) {
    if (
      window.confirm(`Are you sure you want to delete ${deletedCourse.name}?`)
    ) {
      const { id } = deletedCourse

      axios
        .delete(`https://localhost:7111/api/courses/${id}`)
        .then(() => setCourses(getUpdatedCourses(deletedCourse, true)))
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <Header />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-1/2 h-12 flex items-center justify-between">
          <div className="w-40 h-12 ">
            <h1 className="text-4xl font-bold">Name</h1>
          </div>
          <div className="w-40 h-12">
            <h1 className="text-4xl font-bold">Code</h1>
          </div>
          <span className="w-32 h-12" />
          <span className="w-32 h-12" />
        </div>
        <form
          className="w-1/2 h-20 flex items-center justify-between"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            value={newCourse.name}
            onChange={handleChange}
            className="w-40 h-12 border-solid border-4 border-black rounded p-3 font-inter"
          />
          <input
            type="number"
            name="code"
            value={newCourse.code}
            onChange={handleChange}
            className="w-40 h-12 border-solid border-4 border-black rounded p-3 font-inter"
          />
          <button
            type="submit"
            className="w-32 h-12 bg-black rounded p-3 text-white text-xl flex items-center justify-center border-solid border-4 border-black hover:bg-white hover:text-black transition-colors"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-32 h-12 bg-white rounded p-3 text-black text-xl flex items-center justify-center border-solid border-4 border-black hover:bg-black hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faBan} />
          </button>
        </form>
        {courses.length > 0 ? (
          <table className="w-1/2 font-ibm-plex-mono table-auto border-solid border-4 border-black rounded-md">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Code</th>
            </tr>
            {courses.map((c) => {
              return (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.code}</td>
                  <td>
                    <button onClick={() => handleUpdate(c)}>
                      <FontAwesomeIcon icon={faMarker} />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(c)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </table>
        ) : (
          <></>
        )}
      </div>
      <Footer />
    </div>
  )
}
