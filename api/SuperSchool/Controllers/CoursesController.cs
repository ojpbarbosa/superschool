using SuperSchool.Data;
using SuperSchool.Models;
using Microsoft.AspNetCore.Mvc;

namespace SuperSchool.Controllers;

[ApiController]
[Route("api/courses")]
public class CoursesController : ControllerBase
{
  private SchoolContext _context;

  public CoursesController(SchoolContext context)
  {
    _context = context;
  }

  [HttpGet]
  public ActionResult<List<Course>> GetAll()
  {
    return _context.Courses.ToList();
  }

  [HttpGet("{id}")]
  public ActionResult<Course> GetById(string id)
  {
    try
    {
      Course course = _context.Courses.Find(id);

      if (course == null)
      {
        return NotFound();
      }

      return Ok(course);
    }
    catch
    {
      return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
    }
  }

  [HttpPost]
  public async Task<ActionResult> Post(Course course)
  {
    try
    {
      _context.Courses.Add(course);

      if (await _context.Courses.SaveChangesAsync() == 1)
      {
        return Created($"/api/courses/{course.Id}", course);
      }
    }
    catch
    {
      return StatusCode(StatusCodes.Status500InternalServerError, "Error creating course");
    }

    return BadRequest();
  }

  [HttpPut("{id}")]
  public async Task<ActionResult> Put(string id, Course course)
  {
    try
    {
      Course c = _context.Courses.Find(id);

      if (c == null)
      {
        return NotFound();
      }

      c.Name = course.Name;
      c.Code = course.Code;

      if (await _context.Courses.SaveChangesAsync() == 1)
      {
        return Ok(c);
      }
    }
    catch
    {
      return StatusCode(StatusCodes.Status500InternalServerError, "Error updating course");
    }

    return BadRequest();
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> Delete(string id)
  {
    try
    {
      Course course = _context.Courses.Find(id);

      if (course == null)
      {
        return NotFound();
      }

      _context.Courses.Remove(course);

      if (await _context.Courses.SaveChangesAsync() == 1)
      {
        return NoContent();
      }
    }
    catch
    {
      return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting course");
    }

    return BadRequest();
  }
}
