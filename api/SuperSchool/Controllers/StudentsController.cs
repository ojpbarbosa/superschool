using SuperSchool.Data;
using SuperSchool.Models;
using Microsoft.AspNetCore.Mvc;

namespace SuperSchool.Controllers;

[ApiController]
[Route("api/students")]
public class StudentsController : ControllerBase
{
  private SchoolContext _context;

  public StudentsController(SchoolContext context)
  {
    _context = context;
  }

  [HttpGet]
  public ActionResult<List<Student>> GetAll()
  {
    return _context.Students.ToList();
  }

  [HttpGet("{id}")]
  public ActionResult<Student> GetById(string id)
  {
    try
    {
      Student student = _context.Students.Find(id);

      if (student == null)
      {
        return NotFound();
      }

      return Ok(student);
    }
    catch
    {
      return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
    }
  }

  [HttpPost]
  public async Task<ActionResult> Post(Student student)
  {
    try
    {
      _context.Students.Add(student);

      if (await _context.SaveChangesAsync() == 1)
      {
        return Created($"/api/students/{student.Id}", student);
      }
    }
    catch
    {
      return StatusCode(StatusCodes.Status500InternalServerError, "Error creating student");
    }

    return BadRequest();
  }

  [HttpPut("{id}")]
  public async Task<ActionResult> Put(string id, Student student)
  {
    try
    {
      Student s = _context.Students.Find(id);

      if (s == null)
      {
        return BadRequest();
      }

      s.EnrollmentNumber = student.EnrollmentNumber;
      s.Name = student.Name;
      s.Course = student.Course;

      if (await _context.SaveChangesAsync() == 1)
      {
        return Ok(s);
      }
    }
    catch
    {
      return StatusCode(StatusCodes.Status500InternalServerError, "Error updating student");
    }

    return BadRequest();
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> Delete(string id)
  {
    try
    {
      Student student = _context.Students.Find(id);

      if (student == null)
      {
        return NotFound();
      }

      _context.Remove(student);

      if (await _context.SaveChangesAsync() == 1)
      {
        return NoContent();
      }
    }
    catch
    {
      return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting student");
    }

    return BadRequest();
  }
}
