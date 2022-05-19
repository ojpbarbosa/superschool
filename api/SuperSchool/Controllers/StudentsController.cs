using Microsoft.AspNetCore.Mvc;
using SuperSchool.Data;
using SuperSchool.Models;

namespace SuperSchool.Controllers;

[ApiController]
[Route("api/[controller]")]
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
    return _context.Student.ToList();
  }
}
