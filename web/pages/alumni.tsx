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
  alumni: [],
  newAlumni: { id: '', enrollmentNumber: '', name: '', course: 0 }
}

export default function Alumni() {
  const [alumni, setAlumni] = useState(initialState.alumni)
  const [newAlumni, setNewAlumni] = useState(initialState.newAlumni)

  useEffect(() => {
    axios
      .get('https://localhost:7111/api/students')
      .then((response) => response.data)
      .then((data) => {
        setAlumni(data)
      })
  }, [])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setNewAlumni({
      ...newAlumni,
      [name]: value
    })
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const { id } = newAlumni

    const method = id ? 'put' : 'post'
    const url = `https://localhost:7111/api/courses/${id ?? ''}`

    if (!newAlumni.id) {
      newAlumni.id = uuid()
    } else {
      delete newAlumni.id
    }

    axios[method](url, newAlumni)
      .then((response) => response.data)
      .then((data) => {
        setAlumni(getUpdatedAlumni(data))

        setNewAlumni(initialState.newAlumni)
      })
  }

  function getUpdatedAlumni(
    newAlumni: typeof initialState.newAlumni,
    exclude?: boolean
  ) {
    const updatedAlumni = alumni.filter((a) => a.id !== newAlumni.id)

    if (!exclude) {
      updatedAlumni.unshift(newAlumni)
    }

    return updatedAlumni
  }

  function handleCancel() {
    setNewAlumni(initialState.newAlumni)
  }

  function handleUpdate(updatedAlumni: typeof initialState.newAlumni) {
    setNewAlumni(updatedAlumni)
  }

  function handleDelete(deletedAlumni: typeof initialState.newAlumni) {
    if (
      window.confirm(`Are you sure you want to delete ${deletedAlumni.name}?`)
    ) {
      const { id } = deletedAlumni

      axios
        .delete(`https://localhost:7111/api/students/${id}`)
        .then(() => setAlumni(getUpdatedAlumni(deletedAlumni, true)))
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <Header />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-1/2 h-12 flex items-center justify-between">
          <div className="w-40 h-12">
            <h1 className="text-4xl font-bold">EN</h1>
          </div>
          <div className="w-40 h-12 ">
            <h1 className="text-4xl font-bold">Name</h1>
          </div>
          <div className="w-40 h-12">
            <h1 className="text-4xl font-bold">Course</h1>
          </div>
          <span className="w-24 h-12" />
          <span className="w-24 h-12" />
        </div>
        <form
          className="w-1/2 h-20 flex items-center justify-between"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="enrollmentNumber"
            value={newAlumni.enrollmentNumber}
            onChange={handleChange}
            className="w-40 h-12 border-solid border-4 border-black rounded p-3 font-inter"
          />
          <input
            type="text"
            name="name"
            value={newAlumni.name}
            onChange={handleChange}
            className="w-40 h-12 border-solid border-4 border-black rounded p-3 font-inter"
          />
          <input
            type="number"
            name="course"
            value={newAlumni.course}
            onChange={handleChange}
            className="w-40 h-12 border-solid border-4 border-black rounded p-3 font-inter"
          />
          <button
            type="submit"
            className="w-24 h-12 bg-black rounded p-3 text-white text-xl flex items-center justify-center border-solid border-4 border-black hover:bg-white hover:text-black transition-colors"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-24 h-12 bg-white rounded p-3 text-black text-xl flex items-center justify-center border-solid border-4 border-black hover:bg-black hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faBan} />
          </button>
        </form>
        {alumni.length > 0 ? (
          <table className="w-1/2 font-ibm-plex-mono table-auto border-solid border-4 border-black rounded-md">
            <tr>
              <th className="text-left">ID</th>
              <th className="text-left">EN</th>
              <th className="text-left w-[16rem]">Name</th>
              <th className="text-left">Course</th>
            </tr>
            {alumni.map((a) => {
              return (
                <tr key={a.id}>
                  <td className="text-left">{a.id}</td>
                  <td className="text-left">{a.enrollmentNumber}</td>
                  <td className="text-left">{a.name}</td>
                  <td className="text-left">{a.course}</td>
                  <td>
                    <button onClick={() => handleUpdate(a)}>
                      <FontAwesomeIcon icon={faMarker} />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(a)}>
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
